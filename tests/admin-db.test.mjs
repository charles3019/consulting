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
  const db = load('../src/lib/db.ts', {
    'mysql2/promise': mysql, path, './contentDefaults': defaults,
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
