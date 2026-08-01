// Strips anything outside printable ASCII and trims whitespace. Env vars
// pasted through a dashboard UI can pick up stray characters (smart quotes,
// zero-width spaces, etc.) that are invisible on screen but break strict
// consumers like the Fetch API's Headers, which reject non-Latin1 bytes.
// A real URL/token/key never legitimately contains such characters, so
// removing them is safe rather than masking a real problem.
export function cleanEnv(name) {
  const raw = process.env[name];
  if (typeof raw !== 'string') return raw;
  const cleaned = raw.trim().replace(/[^\x20-\x7E]/g, '');
  if (cleaned !== raw) {
    console.warn(`[env] stripped non-ASCII/whitespace characters from ${name} (was ${raw.length} chars, now ${cleaned.length})`);
  }
  return cleaned;
}
