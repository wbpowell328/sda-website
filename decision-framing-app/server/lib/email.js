// Transactional email via Resend. Soft-disabled (logged, not thrown) if
// RESEND_API_KEY is absent — same feature-detection pattern as the
// chatbot's optional RAG/logging integrations.
import { Resend } from 'resend';
import { cleanEnv } from './env.js';

export function emailEnabled() {
  return !!(cleanEnv('RESEND_API_KEY') && cleanEnv('EMAIL_FROM'));
}

let client = null;
function getClient() {
  if (!client) client = new Resend(cleanEnv('RESEND_API_KEY'));
  return client;
}

export async function sendPasswordResetEmail(toEmail, resetUrl) {
  if (!emailEnabled()) {
    console.error('[email] RESEND_API_KEY/EMAIL_FROM not set — cannot send password reset email.');
    return false;
  }
  try {
    await getClient().emails.send({
      from: cleanEnv('EMAIL_FROM'),
      to: toEmail,
      subject: 'Reset your password — CASTLE Decision Framing',
      text: `Someone requested a password reset for this account.\n\n`
          + `Reset your password: ${resetUrl}\n\n`
          + `This link expires in 1 hour. If you didn't request this, you can ignore this email.`,
    });
    return true;
  } catch (e) {
    console.error('[email] failed to send password reset email:', e.message);
    return false;
  }
}
