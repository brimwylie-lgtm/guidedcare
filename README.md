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
| Domain, preview mode, email, hours, HST note, Tally form ID, reply time, signup link | `src/site.config.ts` |
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

## Tally fit call form (Book page)

The Book page shows a placeholder until you add your form.

1. In Tally, create a form called "Request a free fit call" with these fields:
   - Name, email, phone (all required)
   - "What is happening, in a sentence or two?" (long text, required). Add help text: "Please don't include your parent's name or health details."
   - "How urgent is it?" (multiple choice: This week / This month / Planning ahead)
   - "Which city does your parent live in?" (multiple choice: Oakville / Burlington / Milton / Halton Hills / Other)
   - "What times suit you for a 15-minute call?" (short text)
   - Consent checkbox (required): "I agree GuidedCare may contact me about my request, as described in the privacy policy." Link to /privacy/.
2. Publish it, then Share > Embed. Copy the form ID (the last part of the form link, e.g. `tally.so/r/wAbC12` gives `wAbC12`).
3. In `src/site.config.ts`, set `bookingFormId` to that ID and push. The form replaces the placeholder automatically.
4. Change `replyTime` in the same file if "within one business day" isn't right.

Every site button still says "Book a free call" and goes to /book/.

## Before showing it to anyone

- Replace the placeholder story on Home (`pages/home.md`) and About (`pages/about.md`).
- Phone-check the five free-service numbers. Ontario Health atHome's site now lists 1-833-515-1234; 310-2222 is shown as the alternative. Confirm both still connect.
- Privacy and Terms are marked DRAFT pending lawyer review. Leave the banner until they are reviewed.
