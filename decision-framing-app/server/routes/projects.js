import express from 'express';
import { getDb } from '../lib/db.js';
import { requireAuth } from '../lib/auth.js';
import { getOwnedProject } from '../lib/ownership.js';
import { asyncHandler } from '../lib/asyncHandler.js';

const router = express.Router();
router.use(requireAuth);

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

router.get('/api/projects', asyncHandler(async (req, res) => {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT id, name, created_at, updated_at FROM projects WHERE user_id = ? ORDER BY updated_at DESC',
    args: [req.user.id],
  });
  res.json({ projects: result.rows.map(serializeProject) });
}));

router.post('/api/projects', asyncHandler(async (req, res) => {
  const { name } = req.body || {};
  if (!isNonEmptyString(name)) return res.status(400).json({ error: 'Project name is required.' });

  const db = getDb();
  const result = await db.execute({
    sql: 'INSERT INTO projects (user_id, name) VALUES (?, ?)',
    args: [req.user.id, name.trim()],
  });
  const project = await getOwnedProject(req.user.id, Number(result.lastInsertRowid));
  res.status(201).json({ project: serializeProject(project) });
}));

router.get('/api/projects/:id', asyncHandler(async (req, res) => {
  const project = await getOwnedProject(req.user.id, req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found.' });

  const db = getDb();
  const [metricsResult, decisionsResult, cellsResult] = await Promise.all([
    db.execute({
      sql: 'SELECT id, label, level, position FROM metrics WHERE project_id = ? ORDER BY level, position',
      args: [project.id],
    }),
    db.execute({
      sql: 'SELECT id, label, decision_type, position FROM decisions WHERE project_id = ? ORDER BY position',
      args: [project.id],
    }),
    db.execute({
      sql: `SELECT mc.decision_id, mc.metric_id, mc.rating
              FROM matrix_cells mc
              JOIN decisions d ON d.id = mc.decision_id
             WHERE d.project_id = ?`,
      args: [project.id],
    }),
  ]);

  res.json({
    project: serializeProject(project),
    metrics: metricsResult.rows.map(r => ({
      id: Number(r.id), label: r.label, level: Number(r.level), position: Number(r.position),
    })),
    decisions: decisionsResult.rows.map(r => ({
      id: Number(r.id), label: r.label, decisionType: r.decision_type, position: Number(r.position),
    })),
    matrixCells: cellsResult.rows.map(r => ({
      decisionId: Number(r.decision_id), metricId: Number(r.metric_id), rating: r.rating,
    })),
  });
}));

router.patch('/api/projects/:id', asyncHandler(async (req, res) => {
  const project = await getOwnedProject(req.user.id, req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found.' });

  const { name } = req.body || {};
  if (!isNonEmptyString(name)) return res.status(400).json({ error: 'Project name is required.' });

  const db = getDb();
  await db.execute({
    sql: "UPDATE projects SET name = ?, updated_at = unixepoch() WHERE id = ?",
    args: [name.trim(), project.id],
  });
  const updated = await getOwnedProject(req.user.id, project.id);
  res.json({ project: serializeProject(updated) });
}));

router.delete('/api/projects/:id', asyncHandler(async (req, res) => {
  const project = await getOwnedProject(req.user.id, req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found.' });

  const db = getDb();
  await db.execute({ sql: 'DELETE FROM projects WHERE id = ?', args: [project.id] });
  res.json({ ok: true });
}));

function serializeProject(row) {
  return {
    id: Number(row.id),
    name: row.name,
    createdAt: Number(row.created_at),
    updatedAt: Number(row.updated_at),
  };
}

export default router;
