import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';

export default function RequestPasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await api.requestPasswordReset(email);
      setMessage(res.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <h1>Reset your password</h1>
      {message ? (
        <p>{message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Send reset link'}</button>
        </form>
      )}
      <p><Link to="/login">Back to log in</Link></p>
    </div>
  );
}
