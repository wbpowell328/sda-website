// Shared ownership checks. Since every project is private to its creator,
// every route that touches a project (directly or via a metric/decision id)
// must go through one of these so an IDOR bug can't sneak in on a new route.

import { getDb } from './db.js';

export async function getOwnedProject(userId, projectId) {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT id, name, created_at, updated_at FROM projects WHERE id = ? AND user_id = ?',
    args: [projectId, userId],
  });
  return result.rows[0] || null;
}

// Resolves a metric id to its project, but only if that project belongs to userId.
export async function getOwnedMetric(userId, metricId) {
  const db = getDb();
  const result = await db.execute({
    sql: `SELECT m.id, m.project_id, m.label, m.level, m.position
            FROM metrics m JOIN projects p ON p.id = m.project_id
           WHERE m.id = ? AND p.user_id = ?`,
    args: [metricId, userId],
  });
  return result.rows[0] || null;
}

export async function getOwnedDecision(userId, decisionId) {
  const db = getDb();
  const result = await db.execute({
    sql: `SELECT d.id, d.project_id, d.label, d.decision_type, d.position
            FROM decisions d JOIN projects p ON p.id = d.project_id
           WHERE d.id = ? AND p.user_id = ?`,
    args: [decisionId, userId],
  });
  return result.rows[0] || null;
}
