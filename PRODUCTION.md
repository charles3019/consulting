# Production setup

The application is prepared for `https://connectforge.co.uk`. Deployment, DNS, HTTPS and the real production database still need to be configured on your host.

## Runtime and secrets

Use a supported Node.js version compatible with Next.js (this build was tested on Node.js 24). Install with `npm ci`, run `npm run build`, and start with `npm start`.

Configure the server-only variables shown in [.env.example](.env.example) through your host's environment settings. Do not commit actual secrets.

- `AUTH_SECRET`: a random value with at least 32 characters. Generate one locally using `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
- `ADMIN_PASSWORD`: a unique password with at least 16 characters.
- `ADMIN_USERNAME`: defaults to `admin`; set your preferred username.

Production authentication uses these configured credentials exclusively. The development password and seeded database passwords do not grant production access. Run `npm run check:production` to check configuration; `npm start` runs it automatically. Hosts that invoke Next.js directly should run this check as their startup step.

## Persistent storage

Choose one storage setup before accepting enquiries:

1. **MySQL:** set `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD` and `MYSQL_DATABASE`. Use a private connection to the database or a secure tunnel. The application creates its tables on first use, so the account needs the appropriate table-creation and read/write permissions. Configure regular database backups. MySQL initialization failures stop production database operations, and failed writes are reported to visitors instead of silently switching stores.
2. **Single-process Node.js server with a persistent disk:** set `DATA_DIR` to an absolute, existing, writable directory outside the deployed source tree. Copy the current `src/data/db_fallback.json` there as `db_fallback.json` before first startup to retain your managed content and records. Back it up regularly. Run exactly one application process; file storage is unsuitable for serverless hosts, multiple replicas or clustered processes. Writes use a temporary file and rename, and errors are surfaced to the caller.

The bundled source database is not writable storage in production. `DATA_DIR` must be persistent across deployments, not an ephemeral container directory. A MySQL-backed deployment is needed when scaling to multiple instances.

## Launch checks

```sh
npm ci
npm run lint
npm test
npm audit --omit=dev
npm run build
npm run check:production
npm start
```

`npm run test:production` starts a separate local production server, creates isolated temporary records, tests SEO/icon endpoints and browser form submissions, signs into the admin console, verifies the submitted leads, and removes only its temporary test data. It uses Microsoft Edge on Windows. On Linux, install the Playwright Chromium browser with `npx playwright install chromium` before running it. Port 3101 must be available.

The favicon assets are checked in: SVG, multi-size ICO, Apple touch icon and 192/512px application icons. `node scripts/generate-icons.mjs` regenerates the raster formats from the SVG source.

## Behavior to expect

- Contact submissions save into the admin inbox. They do not send email notifications.
- Consultation requests store a complete date and preferred UK time. They are pending requests, not confirmed calendar reservations, and no invitation email is sent automatically.
- Blog articles and resource downloads are marked coming soon and excluded from search until actual content is published.
- Admin and API responses have noindex headers. Public responses include anti-framing, MIME-sniffing and referrer-policy headers.
- Configure HTTPS, request-rate limits and monitoring at your hosting edge. The application does not include a distributed rate-limiting service.

Keep the existing Search Console ownership verification and follow [SEO-DEPLOYMENT.md](SEO-DEPLOYMENT.md) after deployment. Actual indexing, HTTPS, backups and live database connectivity cannot be confirmed from the local build alone.
