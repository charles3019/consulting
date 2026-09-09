import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { test } from 'node:test';
import ts from 'typescript';

// Exercise the real auth module with request cookies and navigation stubbed.
function loadAuth(env = {}) {
  let cookie;
  const exports = {};
  const source = readFileSync(new URL('../src/lib/auth.ts', import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  });
  vm.runInNewContext(outputText, {
    exports, Buffer, Date,
    process: { env: { AUTH_SECRET: 'test-secret', ...env } },
    require(name) {
      if (name === 'crypto') return crypto;
      if (name === './db') return { getAdminUser: async () => null };
      if (name === 'next/navigation') return {
        redirect(url) { throw new Error(`redirect:${url}`); },
      };
      if (name === 'next/headers') return {
        cookies: async () => ({
          get: () => cookie === undefined ? undefined : { value: cookie },
          set: (_name, value) => { cookie = value; },
          delete: () => { cookie = undefined; },
        }),
      };
      throw new Error(`Unexpected module: ${name}`);
    },
  });
  return { auth: exports, setCookie: (value) => { cookie = value; } };
}

test('valid session round-trips and logout requires login again', async () => {
  const { auth } = loadAuth();
  await auth.createAdminSession('admin');
  assert.equal((await auth.requireAdminSession()).username, 'admin');
  await auth.clearAdminSession();
  await assert.rejects(auth.requireAdminSession(), /redirect:\/admin\/login/);
});

test('production refuses development secrets and default credentials', async () => {
  const { auth } = loadAuth({ NODE_ENV: 'production' });
  await assert.rejects(auth.createAdminSession('admin'), /AUTH_SECRET/);
  await assert.rejects(auth.verifyAdminCredentials('admin', 'admin123'), /AUTH_SECRET/);
});

test('production uses only the configured administrator credential', async () => {
  const { auth } = loadAuth({ NODE_ENV: 'production', AUTH_SECRET: 'a'.repeat(64), ADMIN_PASSWORD: 'a-unique-test-password', ADMIN_USERNAME: 'owner' });
  assert.equal(await auth.verifyAdminCredentials('admin', 'admin123'), null);
  assert.equal(await auth.verifyAdminCredentials('owner', 'wrong-password'), null);
  assert.equal((await auth.verifyAdminCredentials('owner', 'a-unique-test-password')).username, 'owner');
});

test('malformed cookies redirect instead of throwing a signature-length error', async () => {
  const { auth, setCookie } = loadAuth();
  for (const value of [undefined, '', 'admin', 'admin:123:x',
    `admin:123:${'a'.repeat(65)}`, `admin:123:${'é'.repeat(64)}`,
    `admin:123:${'0'.repeat(64)}`, `admin:NaN:${'0'.repeat(64)}`]) {
    setCookie(value);
    assert.equal(await auth.getAdminSession(), null);
    await assert.rejects(auth.requireAdminSession(), /redirect:\/admin\/login/);
  }
});

test('expired, tampered, and extra-field signed sessions are rejected', async () => {
  const { auth, setCookie } = loadAuth();
  const token = (expiry) => {
    const payload = `admin:${expiry}`;
    return `${payload}:${crypto.createHmac('sha256', 'test-secret').update(payload).digest('hex')}`;
  };
  const valid = token(Date.now() + 60_000);
  for (const value of [token(Date.now() - 1), `${valid}:extra`,
    valid.replace('admin:', 'intruder:'), token(Number.MAX_SAFE_INTEGER + 1)]) {
    setCookie(value);
    assert.equal(await auth.getAdminSession(), null);
  }
});
