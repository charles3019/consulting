import assert from 'node:assert/strict';
import http from 'node:http';
import https from 'node:https';

const base = process.argv[2] || 'http://localhost:3000';
const canonicalOrigin = 'https://connectforge.co.uk';
const headers = { 'User-Agent': 'Googlebot' };
const get = (path, options = {}) => fetch(new URL(path, base), { headers, ...options });
const markupOnly = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
const meta = (html, name) => html.match(new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`))?.[1];

const robots = await get('/robots.txt');
assert.equal(robots.status, 200);
const rules = await robots.text();
assert.ok(rules.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
assert.ok(rules.includes('Allow: /'));
assert.ok(!/^Disallow: \/$/m.test(rules));

const sitemap = await get('/sitemap.xml');
assert.equal(sitemap.status, 200);
const xml = await sitemap.text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].replaceAll('&amp;', '&'));
assert.equal(urls.length, 13);
assert.equal(new Set(urls).size, urls.length);
const titles = new Set();
for (const url of urls) {
  const parsed = new URL(url);
  assert.equal(parsed.origin, canonicalOrigin);
  assert.ok(!['/admin', '/api', '/blog', '/resources', '/testimonials'].some(path => parsed.pathname.startsWith(path)));
  const response = await get(parsed.pathname + parsed.search);
  assert.equal(response.status, 200, url);
  const raw = await response.text();
  const html = markupOnly(raw);
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  assert.ok(canonical, `Canonical present: ${url}`);
  assert.equal(new URL(canonical).href, url, `Canonical: ${url}`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `Unique title: ${url}`);
  titles.add(title);
  assert.ok(meta(html, 'description')?.length > 30, `Description: ${url}`);
  assert.ok(!meta(html, 'robots')?.includes('noindex'), `Indexable: ${url}`);
  assert.equal(new URL(meta(html, 'og:url')).href, url);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `One server-rendered H1: ${url}`);
  assert.ok(!raw.includes('password_hash'), `No database credentials: ${url}`);
  if (parsed.pathname === '/') {
    const json = raw.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1];
    const schema = JSON.parse(json);
    assert.equal(schema['@graph'][0]['@type'], 'Organization');
    assert.equal(schema['@graph'][0].url, canonicalOrigin);
  }
  console.log(`PASS ${parsed.pathname}${parsed.search}`);
}

for (const path of ['/admin/login', '/blog', '/resources', '/testimonials']) {
  const response = await get(path);
  assert.equal(response.status, 200);
  assert.ok(meta(markupOnly(await response.text()), 'robots')?.includes('noindex'), path);
}
const admin = await get('/admin', { redirect: 'manual', headers });
assert.ok([303, 307].includes(admin.status));
assert.ok(admin.headers.get('location')?.endsWith('/admin/login'));
assert.ok(admin.headers.get('x-robots-tag')?.includes('noindex'));
const api = await get('/api/page-content/home');
assert.ok(api.headers.get('x-robots-tag')?.includes('noindex'));

const invalid = await get('/case-studies?project=does-not-exist');
assert.equal(invalid.status, 404);
const invalidHtml = await invalid.text();
assert.ok(meta(markupOnly(invalidHtml), 'robots')?.includes('noindex'));

if (new URL(base).hostname === 'localhost' || new URL(base).hostname === '127.0.0.1') {
  // Node fetch can replace Host; use the HTTP client to test virtual hosting.
  const redirect = await new Promise((resolve, reject) => {
    const target = new URL('/services?ref=test', base);
    const client = target.protocol === 'https:' ? https : http;
    client.get(target, { headers: { ...headers, host: 'www.connectforge.co.uk' } }, response => {
      response.resume();
      resolve(response);
    }).on('error', reject);
  });
  assert.equal(redirect.statusCode, 308);
  assert.equal(redirect.headers.location, `${canonicalOrigin}/services?ref=test`);
}
console.log('SEO checks passed: sitemap, metadata, server HTML, schema, exclusions, redirects and 404s.');
