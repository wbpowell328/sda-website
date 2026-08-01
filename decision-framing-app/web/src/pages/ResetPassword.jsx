import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { api } from '../api/client.js';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [newPassword, setNewPassword] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await api.resetPassword(token, newPassword);
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!token) {
    return (
      <div className="auth-page">
        <h1>Reset your password</h1>
        <p className="form-error">This link is missing its reset token. Request a new one from the login page.</p>
        <p><Link to="/forgot-password">Request a new reset link</Link></p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="auth-page">
        <h1>Password updated</h1>
        <p>Your password has been reset. You can now log in with your new password.</p>
        <button onClick={() => navigate('/login')}>Go to log in</button>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <h1>Choose a new password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          New password
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={8} autoFocus />
          <small>At least 8 characters.</small>
        </label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" disabled={submitting}>{submitting ? 'Saving…' : 'Reset password'}</button>
      </form>
    </div>
  );
}
