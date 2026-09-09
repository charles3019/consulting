# Search launch for connectforge.co.uk

The canonical origin is `https://connectforge.co.uk`. Search Console ownership is already verified; retain the existing verification record. If verification uses an HTML tag rather than DNS, set `GOOGLE_SITE_VERIFICATION` to its content value in the hosting environment before building. Never replace an existing verification record with a new placeholder.

## Deploy and verify

1. Configure the credentials and persistent storage in [PRODUCTION.md](PRODUCTION.md), then deploy using a Node.js-compatible host (`npm run build`, then `npm run start`). Managed content uses server rendering, revalidation and server actions, so a static-only upload is insufficient.
2. Point the apex and `www` DNS records to the host and enable valid HTTPS certificates for both. Configure HTTP-to-HTTPS redirection at the host. The application permanently redirects `www.connectforge.co.uk` to the apex domain, preserving paths and query parameters.
3. Confirm public pages return HTTP 200 without login or hosting access protection. Keep preview deployments private through the hosting provider.
4. Open `https://connectforge.co.uk/robots.txt` and `https://connectforge.co.uk/sitemap.xml`. The sitemap contains eight public pages and three distinct case studies, all using the canonical HTTPS domain. No fabricated modification dates are published.
5. In the verified Search Console property, submit `https://connectforge.co.uk/sitemap.xml` under **Sitemaps**.
6. Use **URL Inspection → Test live URL** on the homepage, services, about and a case study. Check the rendered HTML, canonical URL and indexing permission, then select **Request indexing**.
7. Inspect the homepage using Google's Rich Results Test to validate the Organization and WebSite JSON-LD. No ratings, addresses or certifications have been invented for structured data.
8. Monitor Search Console's Page indexing, Sitemaps, HTTPS and Core Web Vitals reports after launch. A sitemap submission or indexing request does not guarantee inclusion or rankings.

## Implemented behavior

- Public routes have distinct server-rendered titles, descriptions, canonical URLs and social metadata.
- Home, about, services and skills use the same managed data for HTML and metadata, with five-minute revalidation and immediate invalidation on admin saves.
- Case studies render their selected content on the server. Each valid `project` has its own canonical URL; unknown projects return not-found rather than duplicate default content.
- Admin pages are authenticated and carry `noindex` metadata and response headers. API responses also carry `noindex` headers. Admin URLs are not disallowed in robots.txt so crawlers can see their noindex directives.
- `/blog` and `/resources` are temporarily `noindex` and excluded from the sitemap because article buttons and download actions are placeholders. Once real articles/downloads work, remove `index: false` for those routes in `src/lib/seo.ts` and rebuild.
- The logo uses Next.js image optimization with explicit dimensions. About-page responsive image sizing is corrected.
- Client components receive only the public site-data sections they need, rather than importing the fallback database.

## Validation

Run `node --test tests/*.test.mjs` and `npm run build`. Start the production server, then run `node scripts/check-seo.mjs http://localhost:3000` to inspect HTTP responses and server-rendered markup. The same check can run against the canonical live domain after deployment.

Actual Google indexing and field Core Web Vitals can only be confirmed against the deployed site. They have not been verified while deployment is pending.

## Google references

- [Sitemap creation and submission](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [URL Inspection and requesting indexing](https://support.google.com/webmasters/answer/9012289)
- [Canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
