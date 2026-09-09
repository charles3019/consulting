import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

function loadDatabase(data, { failWrite = false, env = {}, mysql = {} } = {}) {
  let stored = JSON.stringify(data);
  function load(file, dependencies) {
    const exports = {};
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    });
    vm.runInNewContext(outputText, {
      exports, console, process: { env, cwd: () => '/test' },
      require(name) {
        if (name in dependencies) return dependencies[name];
        throw new Error(`Unexpected module: ${name}`);
      },
    });
    return exports;
  }
  const defaults = load('../src/lib/contentDefaults.ts', {});
  const activities = {};
  const db = load('../src/lib/db.ts', {
    'mysql2/promise': mysql, path, './contentDefaults': defaults, './activities': activities,
    fs: {
      existsSync: () => true,
      mkdirSync: () => {},
      readFileSync: () => stored,
      writeFileSync: (_file, value) => {
        if (failWrite) throw new Error('Disk is read-only');
        stored = value;
      },
      renameSync: () => {},
    },
  });
  return { db, readStored: () => JSON.parse(stored) };
}

test('dashboard loads the existing split-page database without losing site data', async () => {
  const fixture = {
    page_content_home: {
      home: { page_key: 'home', hero_title: 'Custom home title' },
      technologies: ['Linux'],
    },
    page_content_about: {
      about: { page_key: 'about', hero_title: 'Custom about title' },
      timelineData: [{ year: '2026' }],
    },
    contacts: [{ id: 1, name: 'Test contact' }],
    consultations: [],
    admin_users: [],
  };
  const { db, readStored } = loadDatabase(fixture);
  const pages = await db.listPageContent();
  for (const key of ['home', 'about']) {
    assert.equal(pages.find(page => page.page_key === key).hero_title,
      fixture[`page_content_${key}`][key].hero_title);
  }
  const saved = readStored();
  for (const key of Object.keys(fixture)) assert.deepEqual(saved[key], fixture[key]);
  assert.equal(saved.page_content, undefined, 'Reads must not rewrite the database');
  assert.equal((await db.getContacts()).length, fixture.contacts.length);
});

test('failed persistence is rejected instead of reporting success', async () => {
  const { db } = loadDatabase({}, { failWrite: true });
  await assert.rejects(db.addContact({ name: 'Test', email: 'test@example.com', company: '', phone: '', details: 'Hello' }), /Unable to save data/);
});

test('production will not save to the bundled development database', async () => {
  const { db } = loadDatabase({}, { env: { NODE_ENV: 'production' } });
  await assert.rejects(db.addContact({ name: 'Test', email: 'test@example.com', company: '', phone: '', details: 'Hello' }), /persistent disk/);
});

test('concurrent MySQL requests wait for one completed initialization', async () => {
  let pools = 0;
  let initialized = false;
  const connection = {
    async query(sql) {
      if (sql === 'SELECT * FROM page_content') { initialized = true; return [[{ page_key: 'home' }]]; }
      return [[]];
    },
    release() {},
  };
  const mysql = { createPool() {
    pools++;
    return {
      async getConnection() { return connection; },
      async query() { assert.equal(initialized, true); return [[]]; },
    };
  } };
  const { db } = loadDatabase({}, { mysql, env: { NODE_ENV: 'production', MYSQL_HOST: 'test', MYSQL_USER: 'test', MYSQL_DATABASE: 'test' } });
  await Promise.all([db.getContacts(), db.getConsultations(), db.getDbStatus()]);
  assert.equal(pools, 1);
});

test('missing or malformed collections have safe defaults', async () => {
  for (const fixture of [{}, null, [], { page_content: null, contacts: {}, consultations: null, admin_users: false }]) {
    const { db } = loadDatabase(fixture);
    assert.ok((await db.listPageContent()).length > 0);
    assert.equal((await db.getContacts()).length, 0);
    assert.equal((await db.getConsultations()).length, 0);
    assert.equal(await db.getAdminUser('admin'), null);
  }
});

test('canonical content overrides legacy content and saves survive subsequent reads', async () => {
  const { db } = loadDatabase({
    page_content_home: { home: { page_key: 'home', hero_title: 'Legacy' } },
    page_content: { home: { page_key: 'home', hero_title: 'Current' } },
  });
  assert.equal((await db.getPageContent('home')).hero_title, 'Current');
  await db.savePageContent('home', { hero_title: 'Updated' });
  assert.equal((await db.listPageContent()).find(page => page.page_key === 'home').hero_title, 'Updated');
});

test('activity records can be created, updated and deleted in fallback storage', async () => {
  const { db } = loadDatabase({});
  const input = {
    title: 'Prepare launch', project: 'Website', owner: 'Alex',
    start_date: '2026-09-10', due_date: '2026-09-14', status: 'Planned',
    priority: 'High', progress: 10, description: 'Release checklist',
  };
  await db.addActivity(input);
  let records = await db.getActivities();
  assert.equal(records.length, 1);
  assert.equal(records[0].title, input.title);
  assert.equal(await db.updateActivity(records[0].id, { ...input, status: 'In Progress', progress: 60 }), true);
  records = await db.getActivities();
  assert.equal(records[0].progress, 60);
  assert.equal(records[0].status, 'In Progress');
  assert.equal(await db.deleteActivity(records[0].id), true);
  assert.equal((await db.getActivities()).length, 0);
  assert.equal(await db.deleteActivity(999), false);
});

test('legacy seed copy upgrades without overwriting CMS edits or stored records', async () => {
  const original = { page_content: { home: { hero_title: 'Technology that moves your business forward.', body_text: 'Our custom business introduction.' } }, contacts: [{ id: 1, details: 'Existing record' }] };
  const { db, readStored } = loadDatabase(original);
  const page = await db.getPageContent('home');
  assert.equal(page.hero_title, 'Reliable IT Solutions for Stronger Businesses');
  assert.equal(page.body_text, 'Our custom business introduction.');
  assert.deepEqual(readStored(), original);
});

test('optional contact fields persist alongside older fallback records', async () => {
  const old = { id: 1, name: 'Existing', details: 'Existing enquiry' };
  const { db } = loadDatabase({ contacts: [old] });
  await db.addContact({ name: 'Test', email: 'test@example.com', company: '', phone: '', details: 'New enquiry', service: 'IT Support', location: 'Test location', preferredContact: 'Email' });
  const records = await db.getContacts();
  assert.equal(records.length, 2);
  assert.equal(records[0].service, 'IT Support');
  assert.equal(records[0].location, 'Test location');
  assert.equal(records[0].preferredContact, 'Email');
  assert.equal(records[1].details, old.details);
});

test('MySQL migration adds only missing nullable lead columns and keeps existing data', async () => {
  const queries = [];
  const connection = { release() {}, async query(sql) {
    queries.push(sql);
    if (sql === 'SHOW COLUMNS FROM contacts') return [[{ Field: 'service' }]];
    return [[]];
  } };
  const mysql = { createPool: () => ({ getConnection: async () => connection, end: async () => {} }) };
  const { db } = loadDatabase({}, { env: { MYSQL_HOST: 'test', MYSQL_USER: 'test', MYSQL_DATABASE: 'test', NODE_ENV: 'production' }, mysql });
  assert.equal(await db.getDbStatus(), 'MYSQL LIVE');
  const alterations = queries.filter(sql => sql.startsWith('ALTER TABLE'));
  assert.equal(alterations.length, 2);
  assert.ok(alterations.every(sql => /ADD COLUMN (location|preferredContact) VARCHAR\(150\) NULL/.test(sql)));
  assert.ok(!queries.some(sql => /DROP |TRUNCATE |DELETE FROM/.test(sql)));
});
