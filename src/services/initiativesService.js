// Demo data-access layer for community initiatives.

import { SEED_INITIATIVES, CURRENT_USER } from '../data/seedData';
import { readJSON, writeJSON, networkDelay } from '../utils/storage';

const KEY = 'initiatives';
const JOINED_KEY = 'joinedInitiatives';

function loadAll() {
  const stored = readJSON(KEY, null);
  if (stored === null) {
    writeJSON(KEY, SEED_INITIATIVES);
    return SEED_INITIATIVES;
  }
  return stored;
}

function saveAll(initiatives) {
  writeJSON(KEY, initiatives);
}

function loadJoined() {
  return readJSON(JOINED_KEY, CURRENT_USER.joinedInitiatives);
}

function saveJoined(ids) {
  writeJSON(JOINED_KEY, ids);
}

export async function getInitiatives() {
  await networkDelay(300);
  const joined = loadJoined();
  return loadAll()
    .map((i) => ({ ...i, joined: joined.includes(i.id) }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

export async function joinInitiative(id) {
  await networkDelay(300);
  const all = loadAll();
  const joined = loadJoined();
  if (!joined.includes(id)) {
    saveJoined([...joined, id]);
    saveAll(all.map((i) => (i.id === id ? { ...i, participantCount: i.participantCount + 1 } : i)));
  }
  return getInitiatives();
}

export async function leaveInitiative(id) {
  await networkDelay(300);
  const all = loadAll();
  const joined = loadJoined();
  if (joined.includes(id)) {
    saveJoined(joined.filter((j) => j !== id));
    saveAll(
      all.map((i) => (i.id === id ? { ...i, participantCount: Math.max(0, i.participantCount - 1) } : i))
    );
  }
  return getInitiatives();
}

export function resetInitiatives() {
  saveAll(SEED_INITIATIVES);
  saveJoined(CURRENT_USER.joinedInitiatives);
}
