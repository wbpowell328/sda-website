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
    console.warn(`[env] stripped non-ASCII/whitespace characters from ${name} (was ${raw.length} chars, now ${cleaned.length})`); // TEMP-DEBUG-REMOVE
    const codes = Array.from(raw).slice(0, 30).map(c => c.codePointAt(0)); // TEMP-DEBUG-REMOVE
    console.warn(`[env] ${name} first 30 char codes:`, JSON.stringify(codes)); // TEMP-DEBUG-REMOVE
    const distinctAfter8 = new Set(Array.from(raw).slice(8)); // TEMP-DEBUG-REMOVE
    console.warn(`[env] ${name} distinct chars after index 8:`, JSON.stringify(Array.from(distinctAfter8).map(c => c.codePointAt(0)))); // TEMP-DEBUG-REMOVE
  }
  return cleaned;
}
