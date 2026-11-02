# GuidedCare website (v1)

Lean static site for GuidedCare. Astro 7, plain CSS, deployed on Vercel.
Three runtime dependencies plus two self-hosted font packages. No CMS, no cookies, no online payments.

## Run it locally

Requires Node 22.12 or newer.

```
npm install
npm run dev        # http://localhost:4321
npm run build      # production build into dist/
```

## Deploy (GitHub + Vercel)

1. Create an empty GitHub repo (private is fine) and push this folder to it.
2. In Vercel: Add New > Project > import the repo. Vercel detects Astro. No settings to change.
3. After the first deploy, copy the project URL (for example `guidedcare-site.vercel.app`) into `url` in `src/site.config.ts` and push again.
4. In the Vercel project: Analytics tab > Enable Web Analytics. It is cookie-free, so no consent banner is needed.

Note: Vercel's free Hobby plan is for non-commercial use. It is fine while this is a private preview. Move the project to a Pro team before you take paying clients.

## Where things live

| To change | Edit |
| --- | --- |
| Domain, preview mode, email, hours, HST note, Cal.com link, signup link | `src/site.config.ts` |
| Prices and what each service includes | `src/content/services/*.md` |
| Home, Services, About, Book, Free help copy | `src/content/pages/*.md` |
| Free services listed on Free help | `src/content/free-services/*.md` |
| Privacy policy and Terms | `src/content/legal/*.md` |
| Colours, fonts, type sizes | `src/styles/tokens.css` |

Prices are stored once, in the service files, and every page reads from there.

### Adding a free service

Copy any file in `src/content/free-services/`, rename it, change the fields and the `lastVerified` date. The `order` field sets its position.

### The future directory

`src/content/directory/` uses the same fields as the free services. Add one file per listing, then add a `/directory` page. See `_README.md` in that folder. Files starting with `_` are ignored.

## Design

- Palette: deep teal-blue ("harbour") for headings and links, clay for calls to action, warm off-white background, sand and mist bands. All text pairs meet WCAG 2.1 AA; ratios are listed at the top of `tokens.css`.
- Type: Source Serif 4 for headings, Source Sans 3 for body text, both self-hosted (no Google requests). Body text is 18px on phones and 19px on larger screens.
- Wordmark: text only, "Guided" in harbour and "Care" in clay. See `src/components/Wordmark.astro`.
- Photos: `ImagePlaceholder` boxes on Home and About. Replace with `<img>` tags and real alt text.

## Preview mode

While `indexable: false` in `site.config.ts`:

- every page has a `noindex` tag
- a "Preview site, work in progress" banner shows at the top
- robots.txt leaves out the sitemap

Set `indexable: true` only when the real domain is live.

## Cal.com setup for the fit call (minimum to make the Book page work)

1. Sign up at cal.com (free plan). Choose a username, for example `guidedcare`.
2. Connect your calendar so booked times are blocked.
3. Availability: Monday to Friday, 9 am to 5 pm, America/Toronto.
4. Create an event type: "Free 15-minute fit call", 15 minutes, slug `fit-call`.
   - Location: phone call and/or Cal Video (or Google Meet / Zoom).
   - Booking questions: name, email and phone (make phone required), then:
     - "What is happening, in a sentence or two?" (long text, required) with a note: "Please don't include your parent's name or health details."
     - "How urgent is it?" (radio: This week / This month / Planning ahead)
     - "Which city?" (radio: Oakville / Burlington / Milton / Halton Hills / Other)
   - Limits: buffer of 15 minutes after each call, minimum notice of 4 hours, and a cap on bookings per day and per week (Limits tab).
   - Reminders: turn on an email reminder 24 hours before.
5. In `src/site.config.ts`, set `calLink` to `yourusername/fit-call` and push.

Full Cal.com, Tally and intake setup instructions come in the next step.

## Before showing it to anyone

- Replace the placeholder story on Home (`pages/home.md`) and About (`pages/about.md`).
- Phone-check the five free-service numbers. Ontario Health atHome's site now lists 1-833-515-1234; 310-2222 is shown as the alternative. Confirm both still connect.
- Privacy and Terms are marked DRAFT pending lawyer review. Leave the banner until they are reviewed.
