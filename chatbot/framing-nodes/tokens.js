// Framing tool v2 — random-ID generators for node capabilities.
//
// Two token sizes:
//   read_id     — 10 base62 chars (~59 bits of entropy). Visible in the URL
//                 path; anyone with this can view the node subtree.
//   write_token — 16 base62 chars (~95 bits). Passed as ?w=; grants content
//                 write on this node + structural admin on the subtree.
//
// Both are drawn from a cryptographically-secure RNG (node:crypto). Base62
// keeps the URLs URL-safe without escaping and short enough to email.

import { randomBytes } from 'node:crypto';

const ALPHABET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function base62(len) {
  // Rejection-sample bytes into the 62-char alphabet to avoid the modulo
  // bias you get from `byte % 62`. 4 bytes → up to 4 chars typically; loop
  // until we have `len`.
  const out = [];
  while (out.length < len) {
    const buf = randomBytes(len * 2); // generous — worst case ~1.5x waste
    for (let i = 0; i < buf.length && out.length < len; i++) {
      const b = buf[i];
      if (b < 248) {                   // 248 = 62 * 4 (largest multiple ≤ 256)
        out.push(ALPHABET[b % 62]);
      }
    }
  }
  return out.join('');
}

export const READ_ID_LEN = 10;
export const WRITE_TOKEN_LEN = 16;

export function newReadId()     { return base62(READ_ID_LEN); }
export function newWriteToken() { return base62(WRITE_TOKEN_LEN); }

// Format validators — cheap sanity check on inbound URL params before we
// hit the DB. A malformed token can't match anything, so a fast reject
// avoids a pointless query.
const READ_ID_RE     = new RegExp('^[A-Za-z0-9]{' + READ_ID_LEN + '}$');
const WRITE_TOKEN_RE = new RegExp('^[A-Za-z0-9]{' + WRITE_TOKEN_LEN + '}$');

export function isReadId(s)     { return typeof s === 'string' && READ_ID_RE.test(s); }
export function isWriteToken(s) { return typeof s === 'string' && WRITE_TOKEN_RE.test(s); }
