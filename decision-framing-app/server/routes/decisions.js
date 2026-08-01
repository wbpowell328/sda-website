import express from 'express';
import { getDb } from '../lib/db.js';
import { requireAuth } from '../lib/auth.js';
import { getOwnedProject, getOwnedDecision } from '../lib/ownership.js';
import { isValidDecisionType } from '../lib/decisionTypes.js';
import { asyncHandler } from '../lib/asyncHandler.js';

const router = express.Router();

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

router.post('/api/projects/:id/decisions', requireAuth, asyncHandler(async (req, res) => {
  const project = await getOwnedProject(req.user.id, req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found.' });

  const { label, decisionType } = req.body || {};
  if (!isNonEmptyString(label)) return res.status(400).json({ error: 'Decision label is required.' });
  if (!isValidDecisionType(decisionType)) return res.status(400).json({ error: 'Invalid decision type.' });

  const db = getDb();
  const countResult = await db.execute({
    sql: 'SELECT COUNT(*) AS n FROM decisions WHERE project_id = ?',
    args: [project.id],
  });
  const position = Number(countResult.rows[0].n);

  const insertResult = await db.execute({
    sql: 'INSERT INTO decisions (project_id, label, decision_type, position) VALUES (?, ?, ?, ?)',
    args: [project.id, label.trim(), decisionType || null, position],
  });

  res.status(201).json({
    decision: { id: Number(insertResult.lastInsertRowid), label: label.trim(), decisionType: decisionType || null, position },
  });
}));

router.patch('/api/decisions/:decisionId', requireAuth, asyncHandler(async (req, res) => {
  const decision = await getOwnedDecision(req.user.id, req.params.decisionId);
  if (!decision) return res.status(404).json({ error: 'Decision not found.' });

  const { label, decisionType } = req.body || {};
  if (label !== undefined && !isNonEmptyString(label)) {
    return res.status(400).json({ error: 'Decision label is required.' });
  }
  if (decisionType !== undefined && !isValidDecisionType(decisionType)) {
    return res.status(400).json({ error: 'Invalid decision type.' });
  }

  const nextLabel = label !== undefined ? label.trim() : decision.label;
  const nextType = decisionType !== undefined ? (decisionType || null) : decision.decision_type;

  const db = getDb();
  await db.execute({
    sql: 'UPDATE decisions SET label = ?, decision_type = ? WHERE id = ?',
    args: [nextLabel, nextType, decision.id],
  });
  res.json({ decision: { id: decision.id, label: nextLabel, decisionType: nextType, position: decision.position } });
}));

router.delete('/api/decisions/:decisionId', requireAuth, asyncHandler(async (req, res) => {
  const decision = await getOwnedDecision(req.user.id, req.params.decisionId);
  if (!decision) return res.status(404).json({ error: 'Decision not found.' });

  const db = getDb();
  // matrix_cells referencing this decision cascade-delete via the FK.
  await db.execute({ sql: 'DELETE FROM decisions WHERE id = ?', args: [decision.id] });

  const remaining = await db.execute({
    sql: 'SELECT id FROM decisions WHERE project_id = ? ORDER BY position',
    args: [decision.project_id],
  });
  const statements = remaining.rows.map((row, i) => ({
    sql: 'UPDATE decisions SET position = ? WHERE id = ?',
    args: [i, Number(row.id)],
  }));
  if (statements.length > 0) await db.batch(statements);

  res.json({ ok: true });
}));

// Full-structure reorder: client sends the complete ordered list of every
// decision id in the project. Never touches matrix_cells.
router.post('/api/projects/:id/decisions/reorder', requireAuth, asyncHandler(async (req, res) => {
  const project = await getOwnedProject(req.user.id, req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found.' });

  const { decisionIds } = req.body || {};
  if (!Array.isArray(decisionIds)) return res.status(400).json({ error: 'decisionIds must be an array.' });

  const db = getDb();
  const existing = await db.execute({
    sql: 'SELECT id FROM decisions WHERE project_id = ?',
    args: [project.id],
  });
  const existingIds = new Set(existing.rows.map(r => Number(r.id)));

  if (decisionIds.length !== existingIds.size) {
    return res.status(400).json({ error: 'The reorder must include every decision in the project exactly once.' });
  }

  const statements = [];
  const seenIds = new Set();
  for (let position = 0; position < decisionIds.length; position++) {
    const id = Number(decisionIds[position]);
    if (!existingIds.has(id)) {
      return res.status(400).json({ error: `Decision ${decisionIds[position]} does not belong to this project.` });
    }
    seenIds.add(id);
    statements.push({ sql: 'UPDATE decisions SET position = ? WHERE id = ?', args: [position, id] });
  }
  if (seenIds.size !== existingIds.size) {
    return res.status(400).json({ error: 'The reorder must include every decision in the project exactly once.' });
  }

  await db.batch(statements);
  res.json({ ok: true });
}));

export default router;
