# Parish Website Admin Guide

A plain-language guide for parish staff managing content on sanroqueparish.ph through Sanity Studio. No coding knowledge required.

## Logging In

1. Go to `https://[your-site-domain]/studio`
2. Sign in with the email invited by the developer (Google sign-in or email/password, depending on how your account was set up)
3. You'll land on the Studio desk — a list of content types on the left (Parish Settings, News, Events, Homilies, Ministries, Clergy, Sacraments, FAQ)

## Draft vs. Published

Every piece of content has two states:

- **Draft** — your in-progress edits. Only visible in the Studio, never on the public website.
- **Published** — what visitors currently see.

While you're editing, Sanity saves your draft automatically (you'll never lose work to a crash or closed tab). The public site is **not** updated until you explicitly publish.

### How to Publish

1. Open the document you've been editing
2. Look for the **Publish** button, usually in the bottom-right or top-right of the editing pane
3. Click it — the document is now live on the website within a few seconds

If the Publish button is greyed out, it usually means there are no unpublished changes, or a required field is missing (Studio will highlight it in red).

## Adding Content

### News / Announcements

1. Go to **News** (Announcement) in the left menu → click **+ Create**
2. Fill in:
   - **Title** — required
   - **Slug** — auto-fills from the title; just click "Generate" if it's empty
   - **Excerpt** — a short 1–2 sentence summary for the News list (optional but recommended)
   - **Featured Image** — optional, landscape photos work best; add Alt Text describing the image
   - **Body** — the full article
   - **Category** — pick the closest fit
   - **Published At** — defaults to now; change it if you're backdating
3. Click **Publish**

To take an old announcement down without deleting it, set its **Status** to "Archived" and publish — it disappears from the public News page but stays in Sanity for your records.

### Events

1. **Events** → **+ Create**
2. Fill in Title, Start Date (required), and optionally End Date, Start/End Time, Location, Poster, Description, Registration URL
3. Set **Status** — Upcoming, Ongoing, Completed, or Cancelled. This controls how it's labeled on the site.
4. Publish

### Homilies

1. **Homilies** → **+ Create**
2. Title, Date, and optionally Celebrant, Video URL (a YouTube or Facebook link), Thumbnail, Short Description, Liturgical Occasion
3. If you add a Video URL, the video will play directly on the homily's page — no thumbnail is required
4. Publish

### Ministries

1. **Ministries** → **+ Create**
2. Name, Description, and optionally Image, Coordinator, Contact Information, Meeting Schedule
3. **Display Order** controls where it appears in the list — lower numbers come first
4. Publish

### Clergy

1. **Clergy** → **+ Create**
2. Name and Position are required. Photo and Biography are optional.
3. **Important:** only enter a biography once the parish has approved the exact wording. Leave it blank rather than guess.
4. **Display Order** controls listing order (e.g., Parish Priest first)
5. Publish

### Sacraments

1. Open the existing Sacrament document (e.g., Baptism) or create a new one
2. Fill in Introduction, Requirements, Schedule, Contact Guidance, and any Downloadable Documents
3. **Important:** only enter Requirements and Schedule information the parish office has confirmed as current. Incorrect requirements can cause real problems for parishioners — when in doubt, leave the field blank rather than guess.
4. Publish

### FAQs

1. **FAQ** → **+ Create**
2. Question and Answer are both required
3. **Display Order** controls where it appears in the list
4. Publish

### Mass Schedules & Office Hours

These live in **Parish Settings** (a single document, not a list) under the **Schedules** and **Contact** tabs:

- **Sunday Mass Schedule**, **Weekday Mass Schedule** (Monday–Friday only), **Saturday Mass Schedule**, **Confession Schedule**, **Office Hours** — each is a list of rows with a Label, Time, and optional Note.
- **Label**: only fill this in when it says something the section heading doesn't already (e.g. "First Friday" under Weekday Mass). If a row is just the ordinary Mass for that section, the website automatically hides a label that just repeats the heading — so you don't need to leave it blank, but you also don't need to worry about it looking redundant.
- **Time**: the actual recurring time(s), e.g. "7:00 AM, 9:00 AM".
- **Note**: supporting detail that applies *every week* (e.g. "Sacred Heart Devotion after Mass"). **Do not** use Note for a one-time date like "Easter Sunday" or "Christmas Day" — anything in Note repeats every single week on the live site. One-time schedules belong on the **Events** page instead.

## Image Guidelines

| Content type | Recommended size | Aspect ratio |
|---|---|---|
| News featured image | At least 1200×600px | Landscape (2:1) |
| Event poster | At least 800×450px | Landscape (16:9) |
| Homily thumbnail | At least 960×540px | Landscape (16:9) |
| Ministry image | At least 960×640px | Landscape (3:2) |
| Clergy photo | At least 800×1000px | Portrait (4:5) |

Always fill in **Alt Text** on images — it's what screen readers announce to visitors who can't see the image, and it helps the page show up correctly in search results and social media shares. Describe what's actually in the photo in a short sentence (e.g., "Parishioners gathered for Simbang Gabi Mass"), not the filename.

## What NOT to Publish

- Unconfirmed sacrament requirements, Mass times, or office hours — leave the field blank rather than guess
- A biography or quote attributed to someone without their approval
- Personal information about parishioners shared through the Prayer Request or Contact forms (those go to the parish office by email only — never copy them into a public document)
- Financial or payment details (GCash numbers, bank accounts) that haven't been explicitly confirmed by the parish for public posting
- One-time dates (like "Easter Sunday") inside a recurring Mass Schedule's Note field

## Unpublishing / Archiving Content

- **Announcements**: set Status to "Archived" and publish — removed from the public site, kept in Sanity
- **Events**: set Status to "Completed" or "Cancelled" and publish
- **Anything else** (Ministries, Clergy, FAQs, Sacraments): there's no built-in archive flag. To fully remove something from public view, delete the document (use the "..." menu → Delete), or ask the developer if you'd like an archive option added.

If you're ever unsure whether something should go live, it's always safe to leave it as a draft and ask the developer or a fellow staff member to review it first — drafts are never visible to the public.
