const STORAGE_KEY = 'notes_app.v1';

/**
 * Safely parse JSON, returning fallback on error.
 * @param {string} s
 * @param {any} fallback
 * @returns {any}
 */
function safeParse(s, fallback) {
  try {
    return JSON.parse(s);
  } catch {
    return fallback;
  }
}

/**
 * Load notes from localStorage.
 * PUBLIC_INTERFACE
 * @returns {Array}
 */
export function loadNotes() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return safeParse(raw, []);
}

/**
 * Save notes to localStorage.
 * PUBLIC_INTERFACE
 * @param {Array} notes
 */
export function saveNotes(notes) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes || []));
  } catch {
    // ignore quota or serialization errors
  }
}
