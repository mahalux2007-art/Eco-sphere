// Demo-only authentication. No real accounts, passwords, or sessions are
// created — this simply simulates a logged-in/out state in the browser so
// the frontend can be reviewed end-to-end before a real auth backend exists.

import { CURRENT_USER } from '../data/seedData';
import { readJSON, writeJSON, networkDelay } from '../utils/storage';

const KEY = 'session';

export async function getSession() {
  await networkDelay(150);
  return readJSON(KEY, null);
}

export function getSessionSync() {
  return readJSON(KEY, null);
}

export async function demoLogin({ email } = {}) {
  await networkDelay(500);
  const session = {
    user: { ...CURRENT_USER, email: email || CURRENT_USER.email },
    role: 'student',
    loggedInAt: new Date().toISOString(),
    demo: true,
  };
  writeJSON(KEY, session);
  return session;
}

export async function demoRegister({ fullName, studentEmail }) {
  await networkDelay(600);
  const session = {
    user: { ...CURRENT_USER, name: fullName || CURRENT_USER.name, email: studentEmail || CURRENT_USER.email },
    role: 'student',
    loggedInAt: new Date().toISOString(),
    demo: true,
  };
  writeJSON(KEY, session);
  return session;
}

export async function logout() {
  await networkDelay(200);
  writeJSON(KEY, null);
}

export async function setRole(role) {
  await networkDelay(150);
  const session = readJSON(KEY, null);
  if (!session) return null;
  const updated = { ...session, role };
  writeJSON(KEY, updated);
  return updated;
}
