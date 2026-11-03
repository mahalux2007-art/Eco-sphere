import { CURRENT_USER } from '../data/seedData';
import { readJSON, writeJSON, networkDelay } from '../utils/storage';

const KEY = 'profile';

export async function getProfile() {
  await networkDelay(250);
  return readJSON(KEY, CURRENT_USER);
}

export async function updateProfile(partial) {
  await networkDelay(400);
  const current = readJSON(KEY, CURRENT_USER);
  const updated = { ...current, ...partial };
  writeJSON(KEY, updated);
  return updated;
}
