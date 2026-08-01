import express from 'express';
import { getDb } from '../lib/db.js';
import { requireAuth } from '../lib/auth.js';
import { getOwnedProject, getOwnedMetric } from '../lib/ownership.js';
import { asyncHandler } from '../lib/asyncHandler.js';

const router = express.Router();
router.use(requireAuth);

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

router.post('/api/projects/:id/metrics', asyncHandler(async (req, res) => {
  const project = await getOwnedProject(req.user.id, req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found.' });

  const { label, level } = req.body || {};
  if (!isNonEmptyString(label)) return res.status(400).json({ error: 'Metric label is required.' });
  const levelNum = Number.isInteger(level) ? level : 0;
  if (levelNum < 0) return res.status(400).json({ error: 'Level must be 0 or greater.' });

  const db = getDb();
  const countResult = await db.execute({
    sql: 'SELECT COUNT(*) AS n FROM metrics WHERE project_id = ? AND level = ?',
    args: [project.id, levelNum],
  });
  const position = Number(countResult.rows[0].n);

  const insertResult = await db.execute({
    sql: 'INSERT INTO metrics (project_id, label, level, position) VALUES (?, ?, ?, ?)',
    args: [project.id, label.trim(), levelNum, position],
  });

  res.status(201).json({
    metric: { id: Number(insertResult.lastInsertRowid), label: label.trim(), level: levelNum, position },
  });
}));

router.patch('/api/metrics/:metricId', asyncHandler(async (req, res) => {
  const metric = await getOwnedMetric(req.user.id, req.params.metricId);
  if (!metric) return res.status(404).json({ error: 'Metric not found.' });

  const { label } = req.body || {};
  if (!isNonEmptyString(label)) return res.status(400).json({ error: 'Metric label is required.' });

  const db = getDb();
  await db.execute({ sql: 'UPDATE metrics SET label = ? WHERE id = ?', args: [label.trim(), metric.id] });
  res.json({ metric: { id: metric.id, label: label.trim(), level: metric.level, position: metric.position } });
}));

router.delete('/api/metrics/:metricId', asyncHandler(async (req, res) => {
  const metric = await getOwnedMetric(req.user.id, req.params.metricId);
  if (!metric) return res.status(404).json({ error: 'Metric not found.' });

  const db = getDb();
  // matrix_cells referencing this metric cascade-delete via the FK.
  await db.execute({ sql: 'DELETE FROM metrics WHERE id = ?', args: [metric.id] });

  // Renumber remaining metrics in the same level so positions stay contiguous.
  const remaining = await db.execute({
    sql: 'SELECT id FROM metrics WHERE project_id = ? AND level = ? ORDER BY position',
    args: [metric.project_id, metric.level],
  });
  const statements = remaining.rows.map((row, i) => ({
    sql: 'UPDATE metrics SET position = ? WHERE id = ?',
    args: [i, Number(row.id)],
  }));
  if (statements.length > 0) await db.batch(statements);

  res.json({ ok: true });
}));

// Full-structure reorder: client sends the complete arrangement of every
// metric in the project (level + left-to-right order within that level).
// Applied in one transaction. Never touches matrix_cells — those key off
// metric id, not position, so ratings stay attached correctly.
router.post('/api/projects/:id/metrics/reorder', asyncHandler(async (req, res) => {
  const project = await getOwnedProject(req.user.id, req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found.' });

  const { levels } = req.body || {};
  if (!Array.isArray(levels)) return res.status(400).json({ error: 'levels must be an array.' });

  const db = getDb();
  const existing = await db.execute({
    sql: 'SELECT id FROM metrics WHERE project_id = ?',
    args: [project.id],
  });
  const existingIds = new Set(existing.rows.map(r => Number(r.id)));

  const statements = [];
  const seenIds = new Set();
  for (const levelEntry of levels) {
    const levelNum = Number(levelEntry?.level);
    const metricIds = levelEntry?.metricIds;
    if (!Number.isInteger(levelNum) || levelNum < 0 || !Array.isArray(metricIds)) {
      return res.status(400).json({ error: 'Each level entry needs a non-negative integer level and metricIds array.' });
    }
    for (let position = 0; position < metricIds.length; position++) {
      const id = Number(metricIds[position]);
      if (!existingIds.has(id)) {
        return res.status(400).json({ error: `Metric ${metricIds[position]} does not belong to this project.` });
      }
      seenIds.add(id);
      statements.push({ sql: 'UPDATE metrics SET level = ?, position = ? WHERE id = ?', args: [levelNum, position, id] });
    }
  }

  if (seenIds.size !== existingIds.size) {
    return res.status(400).json({ error: 'The reorder must include every metric in the project exactly once.' });
  }

  await db.batch(statements);
  res.json({ ok: true });
}));

export default router;
