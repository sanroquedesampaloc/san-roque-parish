# Launch Checklist

Tracks everything standing between the current build and a public launch. No credentials are recorded here — see `.env.example` for the variable names, and the project's Vercel dashboard for actual values.

Status key: ✅ Ready · ⚠️ Needs confirmation/action · ❌ Blocked

## CONTENT

- [ ] ⚠️ Confirm the `sundayMassSchedule` entry labeled "Sunday" / 8:00 AM / note "Easter Sunday" — is this a real recurring second Sunday Mass, or a one-time Easter date that should be removed from the recurring schedule? (See `scheduleEntry` field descriptions in Studio for guidance on Note usage going forward.)
- [ ] ⚠️ Confirm Office Hours (currently "To be confirmed")
- [ ] ⚠️ Confirm Confession Schedule time (currently "To be confirmed")
- [ ] ❌ Add content for the 5 missing Sacraments (Confirmation, Holy Eucharist/First Communion, Reconciliation, Holy Matrimony, Anointing of the Sick)
- [ ] ❌ Replace Baptism's placeholder introduction/requirements/schedule/contact guidance with parish-confirmed text
- [ ] ❌ Add a parish-approved clergy photo and biography
- [ ] ⚠️ Confirm whether additional clergy (assistant priest, deacons) should be added
- [ ] ❌ Add at least initial Ministries content (currently none)
- [ ] ❌ Replace `givingInfo` and `footerInfo` placeholder text with real, parish-approved copy
- [ ] ⚪ Optional: add FAQs, Events, and Homilies as they become available (site handles these gracefully when empty)

## FORMS

- [ ] Contact form sends to a real monitored inbox (depends on EMAIL below)
- [ ] Prayer Request form sends to a real monitored inbox (depends on EMAIL below)
- [ ] Submit both forms end-to-end once credentials are live and confirm delivery

## DOMAIN

- [ ] ⚠️ Confirm the real production domain (code currently falls back to a placeholder, `sanroqueparish.ph`, if `NEXT_PUBLIC_SITE_URL` isn't set — this affects the sitemap, canonical URLs, OpenGraph, and structured data)
- [ ] Set `NEXT_PUBLIC_SITE_URL` in Vercel to the confirmed domain before the first production deploy

## DNS

- [ ] Point the domain's DNS at Vercel (A/CNAME records per Vercel's instructions)
- [ ] Confirm DNS propagation before announcing launch

## EMAIL

- [ ] Create/confirm a Resend account and verify the sending domain
- [ ] Set `RESEND_API_KEY`, `EMAIL_FROM`, `CONTACT_TO_EMAIL`, `PRAYER_TO_EMAIL` in Vercel

## TURNSTILE

- [ ] Create a Cloudflare Turnstile site for the production domain
- [ ] Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in Vercel

## SANITY

- [ ] Confirm `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET=production` are set in Vercel (not `preview`)
- [ ] Confirm Studio access/roles for the parish staff who will manage content day-to-day
- [ ] Walk at least one parish staff member through `docs/PARISH-ADMIN-GUIDE.md`

## SEO

- [x] `robots.ts` and `sitemap.ts` implemented and route-complete
- [x] Church structured data (JSON-LD) implemented from confirmed parish details (name, address, phone, email, map link, social links)
- [x] Canonical URLs set on dynamic detail pages (News, Events, Homilies)
- [ ] Re-verify sitemap/canonical/OpenGraph URLs once `NEXT_PUBLIC_SITE_URL` is set to the real domain
- [ ] ⚪ Optional after launch: add Event structured data once real, confirmed events exist

## ANALYTICS

- [ ] Decide whether to add an analytics tool (none is currently installed — adding one is a scope decision for the `architect` agent, not a default)

## QA

- [x] TypeScript, ESLint, production build, and the Playwright suite pass as of this sprint
- [ ] Full manual walkthrough on a real phone and desktop browser once real content is in place
- [ ] Re-run the Playwright suite against the `production` dataset after parish content is added

## BACKUPS

- [ ] See `docs/BACKUP-RECOVERY.md` for how to export/restore the Sanity dataset
- [ ] Confirm who holds access to the GitHub repository and the Sanity project

## HANDOFF

- [ ] Parish staff have Studio login access and have read `docs/PARISH-ADMIN-GUIDE.md`
- [ ] Developer contact/support arrangement after launch is agreed with the parish
- [ ] Confirm who owns the domain registration and hosting (Vercel) billing
