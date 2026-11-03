// Demo data-access layer for environmental reports.
// Every exported function returns a Promise so that swapping the body
// for a `fetch('/api/reports')` call later requires no changes in components.

import { SEED_REPORTS } from '../data/seedData';
import { readJSON, writeJSON, networkDelay, makeId } from '../utils/storage';

const KEY = 'reports';

function loadAll() {
  const stored = readJSON(KEY, null);
  if (stored === null) {
    writeJSON(KEY, SEED_REPORTS);
    return SEED_REPORTS;
  }
  return stored;
}

function saveAll(reports) {
  writeJSON(KEY, reports);
}

export async function getReports() {
  await networkDelay(300);
  return [...loadAll()].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getReportById(id) {
  await networkDelay(150);
  return loadAll().find((r) => r.id === id) ?? null;
}

export async function createReport(data) {
  await networkDelay(400);
  const all = loadAll();
  const newReport = {
    id: makeId('rep'),
    status: 'Submitted',
    date: new Date().toISOString(),
    reporterName: data.reporterName || 'You',
    imageUrl: data.imageUrl || null,
    ...data,
  };
  const updated = [newReport, ...all];
  saveAll(updated);
  return newReport;
}

export async function updateReportStatus(id, status) {
  await networkDelay(300);
  const all = loadAll();
  const updated = all.map((r) => (r.id === id ? { ...r, status } : r));
  saveAll(updated);
  return updated.find((r) => r.id === id);
}

export function resetReports() {
  saveAll(SEED_REPORTS);
}
