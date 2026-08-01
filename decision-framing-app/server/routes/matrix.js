import express from 'express';
import { getDb } from '../lib/db.js';
import { requireAuth } from '../lib/auth.js';
import { getOwnedDecision, getOwnedMetric } from '../lib/ownership.js';
import { asyncHandler } from '../lib/asyncHandler.js';

const router = express.Router();

const VALID_RATINGS = new Set(['H', 'M', 'L', 'N']);

router.patch('/api/matrix-cells', requireAuth, asyncHandler(async (req, res) => {
  const { decisionId, metricId, rating } = req.body || {};
  if (!VALID_RATINGS.has(rating)) return res.status(400).json({ error: 'rating must be one of H, M, L, N.' });

  const [decision, metric] = await Promise.all([
    getOwnedDecision(req.user.id, decisionId),
    getOwnedMetric(req.user.id, metricId),
  ]);
  if (!decision || !metric) return res.status(404).json({ error: 'Decision or metric not found.' });
  if (decision.project_id !== metric.project_id) {
    return res.status(400).json({ error: 'Decision and metric must belong to the same project.' });
  }

  const db = getDb();
  await db.execute({
    sql: `INSERT INTO matrix_cells (decision_id, metric_id, rating)
          VALUES (?, ?, ?)
          ON CONFLICT(decision_id, metric_id) DO UPDATE SET rating = excluded.rating, updated_at = unixepoch()`,
    args: [decision.id, metric.id, rating],
  });

  res.json({ decisionId: decision.id, metricId: metric.id, rating });
}));

export default router;
