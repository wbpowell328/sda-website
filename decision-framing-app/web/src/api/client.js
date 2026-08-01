// Thin fetch wrapper. credentials:'include' isn't strictly required since
// the app is served same-origin in production, but keeps the dev proxy
// setup (Vite on one port, Express on another) working identically.
async function request(path, options = {}) {
  const res = await fetch(path, {
    credentials: 'include',
    headers: options.body ? { 'Content-Type': 'application/json' } : undefined,
    ...options,
  });
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : null;
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  signup: (email, password) => request('/api/auth/signup', { method: 'POST', body: JSON.stringify({ email, password }) }),
  login: (email, password) => request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
  me: () => request('/api/auth/me'),
  requestPasswordReset: (email) => request('/api/auth/request-password-reset', { method: 'POST', body: JSON.stringify({ email }) }),
  resetPassword: (token, newPassword) => request('/api/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, newPassword }) }),

  listProjects: () => request('/api/projects'),
  createProject: (name) => request('/api/projects', { method: 'POST', body: JSON.stringify({ name }) }),
  getProject: (id) => request(`/api/projects/${id}`),
  renameProject: (id, name) => request(`/api/projects/${id}`, { method: 'PATCH', body: JSON.stringify({ name }) }),
  deleteProject: (id) => request(`/api/projects/${id}`, { method: 'DELETE' }),

  createMetric: (projectId, label, level) =>
    request(`/api/projects/${projectId}/metrics`, { method: 'POST', body: JSON.stringify({ label, level }) }),
  renameMetric: (metricId, label) =>
    request(`/api/metrics/${metricId}`, { method: 'PATCH', body: JSON.stringify({ label }) }),
  deleteMetric: (metricId) =>
    request(`/api/metrics/${metricId}`, { method: 'DELETE' }),
  reorderMetrics: (projectId, levels) =>
    request(`/api/projects/${projectId}/metrics/reorder`, { method: 'POST', body: JSON.stringify({ levels }) }),

  createDecision: (projectId, label, decisionType) =>
    request(`/api/projects/${projectId}/decisions`, { method: 'POST', body: JSON.stringify({ label, decisionType }) }),
  updateDecision: (decisionId, fields) =>
    request(`/api/decisions/${decisionId}`, { method: 'PATCH', body: JSON.stringify(fields) }),
  deleteDecision: (decisionId) =>
    request(`/api/decisions/${decisionId}`, { method: 'DELETE' }),
  reorderDecisions: (projectId, decisionIds) =>
    request(`/api/projects/${projectId}/decisions/reorder`, { method: 'POST', body: JSON.stringify({ decisionIds }) }),

  setMatrixCell: (decisionId, metricId, rating) =>
    request('/api/matrix-cells', { method: 'PATCH', body: JSON.stringify({ decisionId, metricId, rating }) }),
};
