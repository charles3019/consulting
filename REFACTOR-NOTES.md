# ConnectForge IT Services refactor

## Delivered

- Refactored the existing Next.js application and navy/cyan design. The homepage now follows hero, services, reasons to choose ConnectForge, starting prices, work examples, industries, free quote and social sections.
- Standardised the seven services and requested GBP starting prices, with the full pricing disclaimer on both pricing areas. Added shared service cards and a central service catalogue.
- Simplified navigation to Home, Services, Our Work, About and Contact. Quote buttons lead to `/contact`; `/book-consultation` remains available for larger projects.
- Preserved both founders and existing technical backgrounds. Replaced the career path with Discover, Design, Build, Secure, Support and Grow. Credential data remains in the repository, but unsupported public verification badges are no longer displayed.
- Removed unverified testimonials and set their route to noindex. Kept the three available architecture examples, clearly labelled as internal lab, demonstration project and engineering example. Removed unsupported commercial metrics and portfolio entries whose linked case studies did not exist.
- Added service, location and preferred contact method to the enquiry form, storage and admin leads. Existing submissions remain valid. Added server-validated honeypots to contact and consultation forms, accessible status/error messages and a privacy link.
- Centralised existing social URLs. Preserved the existing Charles Agyemang LinkedIn profile and WhatsApp link; removed generic LinkedIn/GitHub destinations.
- Replaced the non-functional newsletter with a quote CTA. Added `/privacy`, `/terms` and `/cookies` starter pages, and corrected footer destinations.
- Updated branding, metadata and Organization schema. Preserved canonical URLs, Google verification, robots, sitemap and admin/API noindex protection. The sitemap now has 13 entries, including the three policy routes and excluding testimonials.
- Added keyboard focus styles, reduced-motion handling and mobile overflow protection. Preserved Next.js Image, brand/founder images and the InteractiveNetwork component. Large decorative assets are not newly loaded above the fold.

## Files changed by this refactor

Public pages:

- `src/app/PageClient.tsx`
- `src/app/about/PageClient.tsx`
- `src/app/services/PageClient.tsx`
- `src/app/contact/PageClient.tsx`
- `src/app/book-consultation/PageClient.tsx`
- `src/app/portfolio/PageClient.tsx`
- `src/app/case-studies/PageClient.tsx`, `src/app/case-studies/page.tsx`
- `src/app/testimonials/PageClient.tsx`
- `src/app/resources/PageClient.tsx`, `src/app/skills/PageClient.tsx`
- New `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/cookies/page.tsx`
- `src/app/layout.tsx`, `src/app/globals.css`, `src/app/manifest.ts`

Components:

- `src/components/Navbar.tsx`, `Footer.tsx`, `SocialLinks.tsx`, `LogoMark.tsx`, `OrganizationSchema.tsx`, `InteractiveNetwork.tsx`, `InsideMyLab.tsx`
- New `src/components/ServiceCards.tsx`, `src/components/MotionProvider.tsx`

Content, leads and validation:

- `src/lib/seo.ts`, `src/lib/contentDefaults.ts`, `src/lib/caseStudies.ts`, `src/lib/db.ts`
- New `src/lib/services.ts`, `src/lib/social.ts`
- `src/data/db_fallback.json`
- `src/app/actions/public.ts`
- `src/app/admin/(protected)/leads/page.tsx`, `src/app/admin/layout.tsx` (brand wording)
- `scripts/check-seo.mjs`, `scripts/check-production.mjs`
- `tests/public-actions.test.mjs`, `tests/admin-db.test.mjs`
- This document

The workspace already contained package/lockfile changes and admin/activity work. Those changes were preserved. `npm install` completed without adding runtime dependencies for this refactor. Some files may initially appear modified in Git's status cache due to Windows line-ending normalisation; `git diff` shows the substantive changes.

## Preserved and deliberately deferred

- Admin authentication, session cookie settings, production credential checks, CMS, MySQL integration, consultation scheduling and the existing activity/Gantt work remain in place.
- `/skills` remains accessible but is no longer in primary navigation. Blog/resources remain noindex. Existing `/portfolio` and supported case-study URLs remain available.
- No deployment, commit, real customer submission or production database access was performed.
- No external anti-spam service or per-process rate limiter was added. A reliable shared rate limiter would require an agreed deployment/storage design; honeypots provide the requested minimum protection now.
- No legal registration, address, review, testimonial, qualification or performance result was invented. No legal-name environment setting was added because no verified registration information was supplied.
- Removed enquiry/admin sample records only from the repository's bundled fallback data. Persistent storage and MySQL customer records were not cleared. Existing Git history was not rewritten.

## Database and environment

No new environment variables are required. Existing production `AUTH_SECRET`, administrator credentials and MySQL or persistent `DATA_DIR` requirements are unchanged.

At database initialisation, the app checks `contacts` and adds only missing columns:

```sql
ALTER TABLE contacts ADD COLUMN service VARCHAR(150) NULL;
ALTER TABLE contacts ADD COLUMN location VARCHAR(150) NULL;
ALTER TABLE contacts ADD COLUMN preferredContact VARCHAR(150) NULL;
```

The application checks each column before applying its statement and tolerates another worker adding the same column concurrently. Existing records retain NULL values. The production database user needs permission to inspect the table and add columns. Alternatively, a database administrator can add only the missing columns before deploying. Take a normal database backup before release. The migration was tested with a MySQL mock; no live MySQL instance was available for verification.

Known legacy seed copy is upgraded on read, including in the CMS view. This avoids restoring old public wording from an existing database without overwriting stored custom edits. Review custom CMS copy after deployment, since it is intentionally preserved.

## Assumptions and business confirmations before launch

- The supplied service descriptions and prices are the intended public offering. Confirm VAT treatment, on-site coverage/travel terms, support scope, business hours and the normal one-business-day response expectation.
- The existing LinkedIn and WhatsApp destinations are retained as supplied by the repository. Confirm that they are the intended business contact channels.
- No reliable evidence established approval to publish existing testimonials, quantified results or credential verification badges. Supply evidence and permission before restoring those claims.
- Confirm the legal operator/data controller, business contact details, hosting/storage providers, international transfers if any, retention schedule and deletion process. Have the starter policies reviewed before final legal launch. Privacy information was checked against [ICO guidance on information to provide](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/).

## Verification

- `npm install`: passed; audit reported zero vulnerabilities.
- `npm run lint`: passed.
- `npm test`: 22 tests passed, including auth, storage failure handling, lead validation, honeypots, legacy-content preservation and additive migration coverage.
- `npm run build`: passed with 26 generated pages.
- `npm run check:seo -- http://127.0.0.1:3102`: passed. A separate port was used because port 3000 was already occupied.
- `npm run test:production`: passed. Uses an isolated temporary data directory and test-only credentials, checks production configuration, SEO, security headers, forms, admin leads and activity tracking. It also checks all eight principal/policy pages at 375, 430, 768, 1024 and 1440 pixels, including horizontal overflow and mobile navigation.
- Screenshots are generated under ignored `.next/qa/` for homepage, services and contact at mobile and desktop sizes.
- The in-app browser could not initialise because of an environment error. Visual verification used the repository's existing Playwright/Edge test workflow and local screenshots.

## Live visual checklist

- Confirm the hero wording, seven services, GBP symbols and both pricing disclaimers.
- Open and close mobile navigation; follow quote buttons, service links and the three policy links.
- Submit a clearly labelled test enquiry and confirm its service, location and preferred contact method appear in admin leads.
- Check consultation booking, admin login and CMS edits with the real deployment configuration.
- Review founder copy, work-example labels, social destinations, keyboard focus and reduced-motion behaviour.
- Check the pages at 375, 430, 768, 1024 and 1440 pixels and confirm no sideways scrolling.
- Confirm deployed `/robots.txt`, `/sitemap.xml`, canonical origin and noindex on testimonials/admin/API pages.
