import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { chromium } from '@playwright/test';

const directory = await mkdtemp(path.join(tmpdir(), 'connectforge-test-'));
const env = { ...process.env, NODE_ENV: 'production', DATA_DIR: directory,
  AUTH_SECRET: 'test-only-secret-that-is-longer-than-32-characters', ADMIN_PASSWORD: 'test-only-admin-password', ADMIN_USERNAME: 'owner',
  MYSQL_HOST: '', MYSQL_USER: '', MYSQL_DATABASE: '', MYSQL_PASSWORD: '' };
await writeFile(path.join(directory, 'db_fallback.json'), JSON.stringify({ page_content: {}, contacts: [], consultations: [], admin_users: [] }));
const port = '3101';
const base = `http://localhost:${port}`;
let output = '';
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', port, '--hostname', '127.0.0.1'], { env, windowsHide: true });
server.stdout.on('data', chunk => { output += chunk; });
server.stderr.on('data', chunk => { output += chunk; });
let browser;
try {
  const configuration = spawn(process.execPath, ['scripts/check-production-env.mjs'], { env, windowsHide: true, stdio: 'inherit' });
  assert.equal((await once(configuration, 'exit'))[0], 0, 'Configured production startup passes');
  const deadline = Date.now() + 30000;
  let ready = false;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error(output);
    try { if ((await fetch(base)).ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  assert.ok(ready, 'Production server starts');
  const seo = spawn(process.execPath, ['scripts/check-seo.mjs', base], { env, windowsHide: true, stdio: 'inherit' });
  assert.equal((await once(seo, 'exit'))[0], 0);
  for (const icon of ['/favicon.ico', '/icon.svg', '/apple-icon.png', '/icon-192.png', '/icon-512.png', '/manifest.webmanifest']) {
    const response = await fetch(base + icon);
    assert.equal(response.status, 200, icon);
    assert.ok((await response.arrayBuffer()).byteLength > 0);
  }
  const response = await fetch(base);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(response.headers.get('x-frame-options'), 'DENY');
  assert.equal(response.headers.get('x-powered-by'), null);

  browser = await chromium.launch({ channel: process.platform === 'win32' ? 'msedge' : undefined, headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base + '/contact');
  await page.locator('#name').fill('Production test');
  await page.locator('#email').fill('test@example.com');
  await page.locator('#details').fill('Isolated contact form test');
  await page.getByLabel('Service Required').selectOption('Network Engineering');
  await page.getByLabel('Postcode / Location').fill('Test location');
  await page.getByLabel('Preferred Contact Method').selectOption('Email');
  await page.getByRole('button', { name: 'Request a Quote', exact: true }).click();
  await page.getByRole('heading', { name: 'Message Received' }).waitFor();
  let data = JSON.parse(await readFile(path.join(directory, 'db_fallback.json'), 'utf8'));
  assert.equal(data.contacts.length, 1);
  assert.equal(data.contacts[0].details, 'Isolated contact form test');
  assert.equal(data.contacts[0].service, 'Network Engineering');
  assert.equal(data.contacts[0].location, 'Test location');
  assert.equal(data.contacts[0].preferredContact, 'Email');

  await page.goto(base + '/book-consultation');
  await page.getByRole('heading', { name: 'Infrastructure Review', exact: true }).click();
  await page.getByRole('button', { name: 'Next month', exact: true }).click();
  const days = page.getByRole('button', { name: /^\d{1,2}$/ });
  for (const day of await days.all()) {
    if (await day.isEnabled()) { await day.click(); break; }
  }
  await page.getByRole('button', { name: /09:00/ }).click();
  await page.getByRole('button', { name: 'Input Details', exact: true }).click();
  await page.locator('#name').fill('Booking test');
  await page.locator('#email').fill('booking@example.com');
  await page.locator('#company').fill('Test company');
  await page.locator('#details').fill('Isolated booking form test');
  await page.getByRole('button', { name: 'Request Consultation', exact: true }).click();
  await page.getByRole('heading', { name: 'Consultation Requested' }).waitFor();
  data = JSON.parse(await readFile(path.join(directory, 'db_fallback.json'), 'utf8'));
  assert.equal(data.consultations.length, 1);
  assert.equal(String(data.consultations[0].date).length, 8);

  await page.goto(base + '/admin/login');
  await page.getByLabel('Username').fill('owner');
  await page.getByLabel('Password').fill(env.ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Enter CMS' }).click();
  await page.waitForURL(base + '/admin');
  await page.getByRole('link', { name: 'Leads', exact: true }).click();
  await page.getByText('Isolated contact form test', { exact: true }).waitFor();
  await page.getByText('Isolated booking form test', { exact: true }).waitFor();
  await page.getByText('Test location', { exact: true }).waitFor();

  await page.getByRole('link', { name: 'Activities', exact: true }).click();
  await page.getByRole('heading', { name: 'Plan, track and deliver work' }).waitFor();
  const activityForm = page.locator('#register-activity form');
  const activityStart = new Date();
  activityStart.setUTCDate(activityStart.getUTCDate() + 1);
  while ([0, 6].includes(activityStart.getUTCDay())) activityStart.setUTCDate(activityStart.getUTCDate() + 1);
  const activityDate = activityStart.toISOString().slice(0, 10);
  await activityForm.locator('[name="title"]').fill('Production readiness review');
  await activityForm.locator('[name="project"]').fill('Website launch');
  await activityForm.locator('[name="owner"]').fill('Operations');
  await activityForm.locator('[name="start_date"]').fill(activityDate);
  await activityForm.locator('[name="due_date"]').fill(activityDate);
  await activityForm.locator('[name="status"]').selectOption('In Progress');
  await activityForm.locator('[name="priority"]').selectOption('High');
  await activityForm.locator('[name="progress"]').fill('40');
  await activityForm.locator('[name="description"]').fill('Isolated activity tracking test');
  await activityForm.getByRole('button', { name: 'Add activity' }).click();
  await page.waitForURL(/created=1/);
  await page.getByRole('heading', { name: 'Production readiness review' }).waitFor();
  await page.getByText(/Due (today|in \d+ day)/).first().waitFor();
  data = JSON.parse(await readFile(path.join(directory, 'db_fallback.json'), 'utf8'));
  assert.equal(data.activities.length, 1);

  const activityCard = page.locator('article', { hasText: 'Production readiness review' });
  await activityCard.locator('[name="status"]').selectOption('Blocked');
  await activityCard.locator('[name="progress"]').fill('55');
  await activityCard.getByRole('button', { name: 'Save changes' }).click();
  await page.waitForURL(/updated=1/);
  await page.getByText('Activity is blocked', { exact: true }).waitFor();
  data = JSON.parse(await readFile(path.join(directory, 'db_fallback.json'), 'utf8'));
  assert.equal(data.activities[0].status, 'Blocked');
  assert.equal(data.activities[0].progress, 55);

  await mkdir('.next/qa', { recursive: true });
  for (const width of [375, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/services', '/contact', '/portfolio', '/about', '/privacy', '/terms', '/cookies']) {
      await page.goto(base + route);
      assert.equal(await page.locator('h1').count(), 1, `${route} has one heading`);
      const overflow = await page.evaluate(() => [...document.querySelectorAll('main a, main button, main input, main select, main textarea, main h1, main h2, main h3')].filter(element => {
        const box = element.getBoundingClientRect();
        return box.width > 0 && (box.left < -1 || box.right > innerWidth + 1);
      }).map(element => element.textContent?.slice(0, 60)));
      assert.deepEqual(overflow, [], `${route} at ${width}px: controls and headings fit`);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} at ${width}px: no horizontal overflow`);
      if ([375, 1440].includes(width) && ['/', '/services', '/contact'].includes(route)) {
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.8) { scrollTo({ top: y, behavior: 'instant' }); await new Promise(resolve => setTimeout(resolve, 50)); }
          await new Promise(resolve => setTimeout(resolve, 400));
          scrollTo({ top: 0, behavior: 'instant' });
          await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        });
        await page.screenshot({ path: `.next/qa/${route === '/' ? 'home' : route.slice(1)}-${width}.png`, fullPage: true });
      }
    }
    if (width < 1024) {
      await page.getByRole('button', { name: 'Toggle menu' }).click();
      await page.locator('#mobile-navigation').getByRole('link', { name: 'Services', exact: true }).click();
      await page.waitForURL(base + '/services');
      assert.equal(await page.getByRole('button', { name: 'Toggle menu' }).getAttribute('aria-expanded'), 'false');
    }
  }
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log('Production browser checks passed: icons, headers, forms, admin leads, activities, Gantt data and alerts.');
} finally {
  await browser?.close();
  if (server.exitCode === null) { server.kill(); await once(server, 'exit'); }
  // Only the isolated directory created by this script is removed.
  assert.equal(path.dirname(path.resolve(directory)), path.resolve(tmpdir()));
  assert.ok(path.basename(directory).startsWith('connectforge-test-'));
  await rm(directory, { recursive: true, force: true });
}
