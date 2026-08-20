# Slots in `willow`

Implements slot schema version 1 of [`../SLOTS.md`](../SLOTS.md). Names are
defined there; this file records what this template actually marks up. The
validator checks both directions, so this table and the HTML cannot drift apart.

## What this template is for, and what shaped its slot set

A physiotherapist, a dentist, a psychologist, a podiatrist, a small GP practice.
The category is `allied-health`, and the slot set answers the four questions a
patient has before they will ring, in the order they have them:

1. **Do you treat what is wrong with me?** The treatments section is written as
   symptoms rather than as procedure names, because that is what a person types
   into a search box.
2. **Who will I actually see?** The practitioners section, and the reason this
   template needed the new `team.*` namespace.
3. **What happens when I get there?** Three steps, in `process.*`. This is the
   section that converts an anxious first-time patient, and no other template in
   the library has a use for it in this shape.
4. **When are you open, what does it cost, and can I get in the door?** The fee
   table, the hours list, and the questions section.

## Single slots

| Slot | Element | Required | Pages | What goes there |
|---|---|---|---|---|
| `site.title` | `<title>`, `<meta property="og:title">` | required | index | Browser tab and search result title |
| `site.description` | `<meta name="description">`, `<meta property="og:description">` | required | index | One or two sentences for search results |
| `site.canonical` | `<link rel="canonical">`, `<meta property="og:url">` | required | index | Absolute URL of the home page |
| `site.og_image` | `<meta property="og:image">` | optional | index | Absolute URL of the share image |
| `business.name` | text | required | all | Practice name, in the header and the footer |
| `business.tagline` | text | required | all | One line in the footer saying what kind of practice this is |
| `nav.cta` | `<a>` text | optional | all | Label of the header call to action, on a `<span>` inside the link |
| `nav.cta_href` | `<a href>` | optional | all | Where that call to action goes. `index.html#contact` here, and a booking system is the point of it being a slot |
| `hero.eyebrow` | text | required | index | Three or four words. "Taking new patients" is the one that matters |
| `hero.heading` | text (`<h1>`) | required | index | The page's one `<h1>` |
| `hero.body` | text | required | index | Two or three sentences on how care works here |
| `hero.cta_primary` | `<a>` text | required | index | Label of the primary call to action, on a `<span>` inside the link |
| `hero.cta_primary_href` | `<a href>` | optional | index | Where that button goes. `#contact` here |
| `hero.cta_secondary` | `<a>` text | required | index | Label of the secondary call to action, on a `<span>` inside the link |
| `hero.cta_secondary_href` | `<a href>` | optional | index | Where that button goes. `#treatments` here |
| `services.heading` | text (`<h2>`) | required | index | Treatments section heading |
| `services.intro` | text | required | index | One or two sentences under it |
| `team.heading` | text (`<h2>`) | required | index | Practitioners section heading |
| `team.intro` | text | optional | index | One or two sentences under it |
| `process.heading` | text (`<h2>`) | optional | index | First visit section heading |
| `process.intro` | text | optional | index | One sentence under it |
| `compare.heading` | text (`<h2>`) | required | index | Fee table section heading |
| `compare.intro` | text | optional | index | One or two sentences under it |
| `compare.caption` | text (`<caption>`) | required | index | The table's accessible name, `sr-only` |
| `compare.col_subject` | text (`<th scope="col">`) | required | index | Heading of the first column: what the row labels are |
| `compare.col_left` | text (`<th scope="col">`) | required | index | Heading of the second column, the first appointment |
| `compare.col_right` | text (`<th scope="col">`) | required | index | Heading of the third column, the follow-up |
| `hours.heading` | text (`<h2>`) | required | index | Hours section heading |
| `hours.note` | text | optional | index | The qualifier: last appointment of the day, public holidays |
| `faq.heading` | text (`<h2>`) | required | index | Questions section heading |
| `faq.intro` | text | optional | index | One sentence under it |
| `contact.heading` | text (`<h2>`) | required | index | Booking section heading |
| `contact.intro` | text | optional | index | One sentence under it |
| `contact.address` | text | required | index | Street address. Marked twice: the hero and the contact card |
| `contact.phone` | text | required | index | Phone number as it should be read. Marked twice, for the same reason |
| `contact.phone_href` | `<a href>` | required | index | The same number as a `tel:` URI |
| `contact.email` | text | required | index | Public email address |
| `contact.email_href` | `<a href>` | required | index | The same address as a `mailto:` URI |
| `contact.hours` | text | required | index | The one-line summary. Marked twice: the hero and the contact card |
| `footer.blurb` | text | required | all | Closing line above the copyright |
| `footer.copyright` | text | required | all | Copyright line |
| `rs.review_banner.heading` | text | reserved | privacy, terms | Heading of the visible legal review banner |
| `rs.review_banner.body` | text | reserved | privacy, terms | Body of that banner |
| `behaviour.dark_mode` | `<meta content>` | optional | all | `on` to ship the light/dark toggle |
| `behaviour.mobile_nav` | `<meta content>` | optional | index | `on` to close the mobile menu on Escape, outside click and link follow |
| `behaviour.faq_accordion` | `<meta content>` | optional | index | `on` to make opening one answer close the others |

## Repeating groups

| Group | Count shipped | What it repeats | Inner slots |
|---|---|---|---|
| `services.item` | 3 | One thing the practice treats, written as the symptom | `services.item.title`, `services.item.body`, `services.item.detail` |
| `team.member` | 3 | One practitioner: portrait, name, title and registration, two sentences | `team.member.name`, `team.member.role`, `team.member.body`, `team.member.image`, `team.member.image_alt` |
| `process.step` | 3 | One step of a first appointment, numbered by the template | `process.step.title`, `process.step.body` |
| `compare.item` | 4 | One row of the fee table: what you want to know, and the answer for each of the two appointments | `compare.item.subject`, `compare.item.left`, `compare.item.right` |
| `hours.day` | 4 | One row of the opening hours list | `hours.day.name`, `hours.day.time` |
| `faq.item` | 5 | One `<details>`: question in `<summary>`, answer below | `faq.item.question`, `faq.item.answer` |
| `rs.review_banner` | 2 | The visible legal review banner, once on `privacy.html` and once on `terms.html` | `rs.review_banner.heading`, `rs.review_banner.body` |

## `team.*` is new vocabulary, and why it earned it

A practice is chosen by its practitioners. "Who will I be seeing, and what are
they qualified in" is the question a clinic site is judged on, and the answer is
a name, a role, two sentences and a face.

No existing group had that shape. `testimonials.item` carries a name and a role
and is the wrong one, because the third field is a quote rather than a
description, and a template that reused it would have a model writing testimonial
copy into a practitioner's biography. `services.item` describes a thing, not a
person, and has no image pair.

So `../SLOTS.md` gained `team.heading`, `team.intro` and the `team.member`
group. It is an **optional** section, so no existing template becomes wrong and
`slot_schema_version` does not move.

`team.member.image` and `team.member.image_alt` are the ordinary image pair from
section 2 of the vocabulary, and RS015 fails a slotted `<img>` that does not name
its alt slot. That rule matters more here than anywhere: filling a portrait
without filling the alt leaves the template's "Placeholder portrait" text
describing a real practitioner.

## The portraits are drawn, and that is a safety property

`assets/portrait-placeholder.svg` is a shape, not a person. A stock photograph
of a stranger in a clinical coat, sitting under a real practitioner's name and
registration number, is a false claim about who a patient will be treated by. It
is the same class of invented specific that `[ENTITY]` and `[JURISDICTION]`
exist to prevent, wearing a face, and it is easier to ship by accident because
it looks finished.

## `compare.*` is the first real table in the library, and it is not `pricing.tier`

"What does it cost, and can I claim it back" is the question reception is asked
every day, and the honest answer is a grid: two kinds of appointment, and four
things a patient wants to know about each. Until #263 the vocabulary could not
say that. `hours.day` is a name and a time, and `pricing.tier` is a card with a
`name`, a `price` and a `body`, which is what an implementer reaches for and
which puts the words "First appointment" into a field called `price` on a page
that then has a pricing block in its `rocket-site.json` forever.

So this section is `compare.*`: a `<table>` with a slotted `<caption>`, three
`<th scope="col">` headings and a `<tr data-rs-slot-group="compare.item">` per
row, with the row label on a `<th scope="row">`. RS026 holds that shape, because
"it is a table" is the whole argument for the namespace.

**The column headings are slots, and that is the point rather than a detail.**
"First appointment" and "Follow-up" are this practice's two appointment types;
another practice compares "In clinic" and "At home", or "Adults" and "Children".
A heading in template bytes would be a sentence about the client's rows written
before the rows existed, and since a site is created with nobody in the loop it
would be a sentence no new site could ever fix.

**The hours list below it stays a `<dl>`.** It is two columns of free text with
no heading row and nothing to compare, and turning it into a table to match
would be markup pretending there is a second dimension.

## Every call to action is two slots on two elements

The header button and both hero buttons are marked the same way: the `<a>`
carries the destination, a `<span>` inside it carries the label. They cannot
share an element, because one element carries one `data-rs-slot` and an `<img>`
with its `data-rs-slot-alt` is the only exception in the vocabulary. That
`<span>` is not markup a fill would delete: a slot that writes an attribute
rewrites the opening tag and never touches the element's inner range.

**`nav.cta_href` ships `index.html#contact` and not `#contact`.** It is marked
on all four pages and one name means one value everywhere, so a bare fragment
would be a dead link on three of them. The home page's own header button
navigates rather than scrolling, which is the price of the destination being
something a practice can change to its booking system.

**The two hero slots ship bare fragments, and that is not an inconsistency.**
`hero.cta_primary_href` and `hero.cta_secondary_href` are marked on
`index.html` and nowhere else, so `#contact` and `#treatments` resolve
everywhere they appear. The rule is about how many pages a name is marked on,
not about which namespace it is in.

**What the pair buys, beyond a booking system (#269).** Three real Rocket Lab
marketing sites were counted on 2026-08-19 and not one of the eight pages
carries a `<form>`: every enquiry arrives through a `mailto:`, and one of the
three sends the same address three different ways, with a pre-filled subject per
button, because that is how a site with no form tells a demo request from an
access request. `contact.email_href` cannot express it, since one name is one
value. Two buttons that each hold their own `mailto:` can, and a subject is just
part of the URI. Willow ships in-page fragments because a clinic's buttons
belong on its own page; the capability is what changes when a business needs
something else.

## `hours.*` and `contact.hours` are both marked, and they are different facts

`contact.hours` is the one-line summary, in the hero and on the contact card:
the sentence somebody reads at a glance. `hours.day` is the week, as a row per
line the practice would really write, which is why both of its fields are free
text: "Monday to Thursday" and "Sunday and public holidays" are rows a clinic
has, and "Closed" is a legitimate time.

Squeezing a week into `contact.hours` produces a run of text nobody can read on
a phone, which is where it is read.

## `process.*` is the section that converts

Three steps, and the **number is not a slot**: it is the instance's position in
the group, rendered by the template, because a number a generator writes into an
instance can disagree with the order the instances are in.

An anxious first-time patient is deciding whether to make a phone call. Telling
them exactly what the first forty-five minutes contains is worth more than any
other paragraph on the page, and it is the reason `process.*` is here rather
than a second block of prose.

## The behaviours this template ships

`behaviours.js` is part of the template, like `tailwind.css` is. It is written
once, reviewed once and shipped to every site built from willow, and a
`behaviour.*` slot decides whether a given site runs a given part of it. The AI
turns one on by filling the slot with `"on"`; it never writes script into a
client's repository (#166, and #124 for why).

| Slot | What turns on | What it attaches to |
|---|---|---|
| `behaviour.dark_mode` | The theme toggle in the header, and the remembered choice | `[data-rs-theme-toggle]`, and the `brand_dark` palette in `rocket-site.json` |
| `behaviour.mobile_nav` | Closing the mobile menu on Escape, an outside click, and following a link | `[data-rs-mobile-nav]` on the header's `<details>` |
| `behaviour.faq_accordion` | Opening one answer closes the others | the `<details>` elements marked `data-rs-slot-group="faq.item"` |

All three earn their place here specifically. This is a site read at 11pm by
somebody who cannot sleep because their back hurts, on a phone, in the dark. The
navigation is four sections plus a booking call to action, which is a real menu
on a small screen. And the questions section is five long answers about fees,
referrals and cancellations, where an accordion is the difference between a
scannable list and a wall.

Every one of them enhances markup that already works: the menu and the questions
are native `<details>` and open with scripting off, and the theme toggle is
hidden by CSS until the script has run, so it is never a control that does
nothing.

**`behaviour.dark_mode` needs `brand_dark`.** The dark palette is data, in
`rocket-site.json`, and the publisher generates the `[data-rs-theme="dark"]`
override from it. Both palettes pass WCAG AA on every pair this template uses.

## No form, and that is a stronger rule in this category

The contact section ships `tel:` and `mailto:` links and no `<form>`. Three
reasons, and only the first is the usual one:

- There is no server behind a Rocket Site to receive a submission, and a form
  that posts nowhere loses a booking somebody was relying on.
- A free-text field on a health practice's site invites a patient to send
  clinical details through a channel nobody chose for that purpose, and the
  practice then holds them somewhere its own records policy does not cover.
- An online booking provider is the right answer for a practice that has one,
  and it is an ordinary outbound `<a>`, which loads nothing. Embedding a booking
  widget is a `<script src>` on somebody else's host: the artifact guard refuses
  it and `../CONVENTIONS.md` invariant 1 explains why.

`contact.form_action` is not implemented here, and adding a `<form>` pointed at
it is not available to an agency either. Measured on 2026-08-15: an `action` on
another host is refused by RS005 and by the extension's content-safety guard,
and a `mailto:` action passes both and does not submit, because Chrome blocks
the navigation. The sentence that used to offer that route has been removed
rather than reworded. See `../SLOTS.md` section 7, and #231.

The page also carries a plain sentence asking visitors not to send clinical
details or anything urgent by email, and pointing an emergency at the local
emergency number.

## Not slotted, and one of these is deliberate rather than incidental

- **The "general information, not a diagnosis" paragraph** under the treatments
  section, and the emergency sentence in the contact section. They are template
  copy rather than slots **on purpose**: a slot is an invitation to a generator
  to rewrite the text, and these two sentences are the ones a health practice is
  most exposed by. They can still be edited by hand, like any other markup, but
  nothing in the slot vocabulary offers to rewrite them.
- **The body text of `privacy.html` and `terms.html`.** Only the shared chrome
  on those pages is slotted. `privacy.html` here carries an extra unfilled
  section on health information, because a practice holds clinical records and
  most jurisdictions treat those as a special category. It states no obligation:
  it says which obligations have to be written in, and by whom.
- **`[ENTITY]`, `[JURISDICTION]`, `[CONTACT]` and `[DATE]`.** Not slots. They
  live under `legal` in `rocket-site.json`, outside the `slots` map, and every
  one is `null` in the shipped seed. That block is a record of what a person
  decided and is read by no code (#268), so setting a field there leaves the
  page exactly as it was: the placeholders come out when a person edits this
  file.
- **The step numbers** in the first-visit section. Position in the group, not
  content.
- **Decorative artwork.** The header mark and the theme toggle icon are
  `aria-hidden`.
- **The `<dt>` labels** (Open, Phone, Where, Address, Email). They name the
  value beside them; translating one is a template edit.
- **Section ids and layout classes.** The ids are the page's skeleton and
  `template.json.sections` records them; the classes are edited directly, which
  is what keeps the source matching the rendered DOM.

## Secondary pages carry no `site.*` slots

`privacy.html`, `terms.html` and `404.html` ship a plain `<title>` and
description of their own, and no canonical or Open Graph tags. A slot name means
one value everywhere, so marking `site.title` there would force those pages to
share the home page's title. They also carry
`<meta name="robots" content="noindex">`.

## The legal review banner

`privacy.html` and `terms.html` each carry a visible banner saying the document
has not been reviewed, because the HTML comment at the top of those files is
invisible to the agency staffer previewing the site in a browser.

Nothing in Rocket Sites takes it away (#268). The `legal` block of
`rocket-site.json` records what a person decided and is read by no code, so the
warning stays put until somebody removes it deliberately, which is the point: a
page that still says `[ENTITY]` should still say it has not been read.

**Removing it is one edit, and a person makes it:** delete the element carrying
`data-rs-slot-group="rs.review_banner"`.
