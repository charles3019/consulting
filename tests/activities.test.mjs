import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const exports = {};
const source = readFileSync(new URL('../src/lib/activities.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
});
vm.runInNewContext(outputText, {
  exports, Date, Intl,
  require(name) {
    if (name === './booking') return { todayInLondon: () => '2026-09-09' };
    throw new Error(`Unexpected module: ${name}`);
  },
});

const activity = (overrides = {}) => ({
  id: 1,
  title: 'Deploy website',
  project: 'Launch',
  owner: 'Sam',
  start_date: '2026-09-01',
  due_date: '2026-09-12',
  status: 'In Progress',
  priority: 'High',
  progress: 50,
  description: '',
  created_at: '2026-09-01T00:00:00Z',
  updated_at: '2026-09-01T00:00:00Z',
  ...overrides,
});

test('activity dates are validated and measured consistently', () => {
  assert.equal(exports.isIsoDate('2026-09-09'), true);
  assert.equal(exports.isIsoDate('2026-02-30'), false);
  assert.equal(exports.isIsoDate('09/09/2026'), false);
  assert.equal(exports.daysBetween('2026-09-09', '2026-09-12'), 3);
});

test('alerts identify overdue, due-soon, blocked and unassigned work', () => {
  const alerts = exports.getActivityAlerts([
    activity({ id: 1, due_date: '2026-09-08' }),
    activity({ id: 2, due_date: '2026-09-09' }),
    activity({ id: 3, status: 'Blocked', due_date: '2026-09-20' }),
    activity({ id: 4, owner: '', due_date: '2026-09-20' }),
  ], '2026-09-09');
  assert.deepEqual([...new Set(alerts.map(alert => alert.kind))].sort(), ['blocked', 'due-soon', 'overdue', 'unassigned']);
  assert.equal(alerts[0].severity, 'critical');
});

test('completed work produces no alerts', () => {
  assert.equal(exports.getActivityAlerts([
    activity({ status: 'Completed', owner: '', due_date: '2026-01-01', progress: 100 }),
  ], '2026-09-09').length, 0);
});
