/* Willow - the behaviours this template ships (issue #166).
 *
 * ── Why a template ships script at all ───────────────────────────────────
 *
 * A published Rocket Site is static files on the agency's Cloudflare with no
 * server behind it. That is a claim about servers, not about scripting: a theme
 * toggle, a mobile navigation menu and an FAQ accordion all run entirely in the
 * visitor's browser.
 *
 * What stays refused is script the MODEL composes, because the model reads a
 * client's live page as untrusted input and a script dictated by that page would
 * run on the client's own domain. So the behaviours live here: written once,
 * reviewed once, tested, and switched on per site by a slot. The AI turns one on
 * with fill_slots; it never writes code into a client's repository.
 *
 * ── The three switches ───────────────────────────────────────────────────
 *
 *   behaviour.dark_mode       meta[name=rs-behaviour-dark-mode]
 *   behaviour.mobile_nav      meta[name=rs-behaviour-mobile-nav]
 *   behaviour.faq_accordion   meta[name=rs-behaviour-faq-accordion]
 *
 * "on" turns one on. Anything else, including the "off" this template ships,
 * leaves it off, so a site behaves exactly as it did before somebody asked.
 *
 * All three earn their place in a health practice specifically. This is a site
 * read at 11pm by somebody who cannot sleep because their back hurts, on a
 * phone, in the dark. The navigation is four sections plus a booking call to
 * action, which is a real menu on a small screen. And the questions section is
 * five long answers about fees, referrals and cancellations, where an accordion
 * is the difference between a scannable list and a wall.
 *
 * ── The rules this file is held to (RS021 checks them) ───────────────────
 *
 *   NOTHING IS FETCHED. No fetch, no XMLHttpRequest, no WebSocket, no beacon,
 *     no dynamic import. A behaviour that talked to a host would put that host
 *     in the serving path of every site built from this template, which is the
 *     property CLAUDE.md hard rule 1 exists to protect.
 *   NO eval, NO new Function, NO string-bodied timer.
 *   PROGRESSIVE. The menu and the FAQ are native <details> and open with
 *     scripting off; the theme toggle is hidden by CSS until this file has run,
 *     so it is never a control that does nothing.
 *   NO INLINE HANDLERS, and NO CLASS NAMES INVENTED AT RUNTIME: Tailwind emits
 *     only the classes it can find as literal strings in the pages.
 */
(function () {
  "use strict";

  var root = document.documentElement;

  /** Is this behaviour switched on for this site? */
  function enabled(name) {
    var meta = document.querySelector('meta[name="rs-behaviour-' + name + '"]');
    if (!meta) return false;
    return String(meta.getAttribute("content") || "").trim().toLowerCase() === "on";
  }

  /** Run after the document is parsed, whenever this file happens to load. */
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  /* ── Theme ──────────────────────────────────────────────────────────
   *
   * The attribute goes on <html> here in the head, before the body is painted,
   * so a visitor who chose dark does not see a flash of the light palette. The
   * palette itself is the generated [data-rs-theme="dark"] block: this file
   * decides WHICH theme, never what a colour is.
   *
   * localStorage is read defensively. A browser in a locked-down privacy mode
   * throws on access rather than returning null, and a theme toggle is not
   * worth taking a client's page down for.
   */
  var THEME_KEY = "rs-theme";

  function storedTheme() {
    try {
      var value = window.localStorage.getItem(THEME_KEY);
      return value === "dark" || value === "light" ? value : null;
    } catch (err) {
      return null;
    }
  }

  function rememberTheme(theme) {
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch (err) {
      /* Nothing to do, and nothing worth breaking the page over. */
    }
  }

  function prefersDark() {
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  function applyTheme(theme) {
    root.setAttribute("data-rs-theme", theme);
    var toggles = document.querySelectorAll("[data-rs-theme-toggle]");
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
  }

  if (enabled("dark-mode")) {
    applyTheme(storedTheme() || (prefersDark() ? "dark" : "light"));

    ready(function () {
      var toggles = document.querySelectorAll("[data-rs-theme-toggle]");
      for (var i = 0; i < toggles.length; i++) {
        toggles[i].addEventListener("click", function () {
          var next = root.getAttribute("data-rs-theme") === "dark" ? "light" : "dark";
          applyTheme(next);
          rememberTheme(next);
        });
      }
      // Re-run once the buttons exist, so aria-pressed is right on first paint.
      applyTheme(root.getAttribute("data-rs-theme") || "light");
    });
  }

  /* ── Mobile navigation ──────────────────────────────────────────────
   *
   * The menu is a native <details> and needs none of this to open. What it
   * cannot do on its own is close: a visitor who opens it, taps "Practitioners"
   * and lands further down the same page comes back to a menu still covering
   * the content, and on a phone that reads as a broken site.
   */
  function wireMenu(menu) {
    var close = function () {
      menu.removeAttribute("open");
    };

    // A link inside the menu: let the navigation happen, then close.
    menu.addEventListener("click", function (event) {
      var node = event.target;
      while (node && node !== menu) {
        if (node.tagName === "A") {
          close();
          return;
        }
        node = node.parentNode;
      }
    });

    document.addEventListener("click", function (event) {
      if (menu.hasAttribute("open") && !menu.contains(event.target)) close();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !menu.hasAttribute("open")) return;
      close();
      // Focus goes back to the control that opened it, or a keyboard visitor is
      // returned to the top of the document with no idea what just happened.
      var summary = menu.querySelector("summary");
      if (summary) summary.focus();
    });
  }

  if (enabled("mobile-nav")) {
    ready(function () {
      var menus = document.querySelectorAll("[data-rs-mobile-nav]");
      for (var i = 0; i < menus.length; i++) {
        wireMenu(menus[i]);
      }
    });
  }

  /* ── FAQ accordion ──────────────────────────────────────────────────
   *
   * Each question is already a native <details>. The behaviour is the accordion
   * part: opening one closes the others, so a long list does not push the answer
   * a visitor is reading off the screen.
   */
  function wireAccordion(item, items) {
    item.addEventListener("toggle", function () {
      if (!item.hasAttribute("open")) return;
      for (var i = 0; i < items.length; i++) {
        if (items[i] !== item) items[i].removeAttribute("open");
      }
    });
  }

  if (enabled("faq-accordion")) {
    ready(function () {
      var items = document.querySelectorAll('[data-rs-slot-group="faq.item"]');
      for (var i = 0; i < items.length; i++) {
        wireAccordion(items[i], items);
      }
    });
  }
})();
