// Thin localStorage wrapper used by the demo data layer.
// Swap the bodies of these functions for `fetch` calls to a real
// Express/MongoDB API later without touching any component code.

const PREFIX = 'ecosphere:';

export function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // localStorage unavailable (private mode, quota) — fail silently for the demo
  }
}

export function clearNamespace() {
  try {
    Object.keys(window.localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => window.localStorage.removeItem(k));
  } catch {
    // ignore
  }
}

// Simulates network latency so loading states have something to show.
// Real services will replace this with an actual fetch().
export function networkDelay(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function makeId(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
