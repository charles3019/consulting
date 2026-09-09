import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

function load(file, dependencies = {}) {
  const exports = {};
  const { outputText } = ts.transpileModule(readFileSync(new URL(file, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  vm.runInNewContext(outputText, { exports, Date, Intl, require: name => dependencies[name] });
  return exports;
}

const booking = load('../src/lib/booking.ts');
function actions(fail = false) {
  const records = [];
  const save = async value => { if (fail) throw new Error('Unavailable'); records.push(value); };
  return { records, api: load('../src/app/actions/public.ts', {
    '@/lib/db': { addContact: save, addConsultation: save }, '@/lib/booking': booking,
  }) };
}
const contact = { name: 'Test person', email: 'test@example.com', company: 'Test company', phone: '', details: 'A test enquiry' };

test('contact validates input and confirms only persisted messages', async () => {
  const { api, records } = actions();
  assert.equal((await api.submitContactInquiry({ ...contact, email: 'invalid' })).success, false);
  assert.equal(records.length, 0);
  assert.equal((await api.submitContactInquiry(contact)).success, true);
  assert.equal(records.length, 1);
  assert.equal((await actions(true).api.submitContactInquiry(contact)).success, false);
});

test('booking rejects stale dates, invalid dates and unknown choices', async () => {
  const { api, records } = actions();
  for (const date of [15, 20260230, 20260615, booking.bookingDateNumber(booking.todayInLondon()), Infinity]) {
    assert.equal((await api.submitConsultationRequest({ ...contact, type: 'infra', time: '09:00', date })).success, false);
  }
  assert.equal(records.length, 0);
});

test('future weekday booking persists and storage errors are shown', async () => {
  const date = new Date(booking.todayInLondon() + 'T12:00:00Z');
  do { date.setUTCDate(date.getUTCDate() + 1); } while ([0, 6].includes(date.getUTCDay()));
  const request = { ...contact, type: 'infra', time: '09:00', date: booking.bookingDateNumber(date.toISOString().slice(0, 10)) };
  const { api, records } = actions();
  assert.equal((await api.submitConsultationRequest(request)).success, true);
  assert.equal(records[0].date, request.date);
  assert.equal((await api.submitConsultationRequest({ ...request, type: 'unknown' })).success, false);
  assert.equal((await actions(true).api.submitConsultationRequest(request)).success, false);
});
