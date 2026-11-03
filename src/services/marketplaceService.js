// Demo data-access layer for the resource-sharing marketplace.

import { SEED_LISTINGS } from '../data/seedData';
import { readJSON, writeJSON, networkDelay, makeId } from '../utils/storage';

const KEY = 'listings';

function loadAll() {
  const stored = readJSON(KEY, null);
  if (stored === null) {
    writeJSON(KEY, SEED_LISTINGS);
    return SEED_LISTINGS;
  }
  return stored;
}

function saveAll(listings) {
  writeJSON(KEY, listings);
}

export async function getListings() {
  await networkDelay(300);
  return [...loadAll()].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
}

export async function getListingById(id) {
  await networkDelay(150);
  return loadAll().find((l) => l.id === id) ?? null;
}

export async function createListing(data) {
  await networkDelay(400);
  const all = loadAll();
  const newListing = {
    id: makeId('lst'),
    postedDate: new Date().toISOString(),
    ownerName: data.ownerName || 'You',
    imageUrl: data.imageUrl || null,
    ...data,
  };
  const updated = [newListing, ...all];
  saveAll(updated);
  return newListing;
}

export function resetListings() {
  saveAll(SEED_LISTINGS);
}
