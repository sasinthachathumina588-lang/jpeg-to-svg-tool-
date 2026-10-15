# JPEG to SVG — starter project

A minimal responsive converter UI with:
- Embedded SVG conversion (JPEG stays a raster image embedded inside SVG).
- True Vector SVG tracing using ImageTracerJS loaded from jsDelivr.
- Basic About, Privacy, Contact and Terms pages.
- Cloudflare Pages Functions + D1 settings API scaffold.
- Admin dashboard at `/admin`.

## Important notes
1. This is a starter project, not yet a deployed website.
2. Replace `CONTACT_EMAIL` in `contact.html` before publishing.
3. The Privacy Policy is a template. Update it to match the final services, cookies, analytics, advertising, and applicable law.
4. Vector tracing approximates a raster image; it cannot recover original vector artwork. The tracing library is loaded from a CDN and needs an internet connection.
5. The admin login compares secrets configured as Cloudflare Worker/Pages secrets. It never stores the admin password in the database. Configure rate limiting or Cloudflare Turnstile before production use.
6. Admin API requires the `SESSION_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD` secrets and a D1 binding named `DB`.
7. Current settings save to D1, but the starter only applies the public title/description/text settings to its public settings API. To dynamically inject Search Console meta tags, analytics scripts, ads, and editable page content, add the corresponding rendering logic and carefully review provider policies before enabling.
8. Keep secrets out of the repository. Do not commit `.dev.vars`.

## Cloudflare deployment outline
1. Create a Cloudflare account and a Pages project. Upload/deploy this project through Wrangler or connect a Git repository.
2. Create a D1 database named `jpeg-to-svg-settings`.
3. Run `schema.sql` against that D1 database.
4. Set the D1 database binding named `DB` and replace `database_id` in `wrangler.toml`.
5. Configure these secrets for the Pages project: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET` (use a long random value for the last one).
6. Deploy and test the public homepage, `/api/public-settings`, and `/admin`.
7. Before production, add request rate limiting, test the session cookie on the deployed HTTPS origin, and test all admin routes.

## Local preview
Static pages can be previewed with any local static server, but admin API routes need Cloudflare Pages Functions and D1 bindings to work. For full local testing use Wrangler and a local D1 database.
