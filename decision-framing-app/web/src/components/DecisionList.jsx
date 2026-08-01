import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client.js';
import { DECISION_TYPES } from '../lib/decisionTypes.js';

export default function DecisionList({ projectId, decisions }) {
  const queryClient = useQueryClient();
  const [newLabel, setNewLabel] = useState('');
  const [newType, setNewType] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editLabel, setEditLabel] = useState('');
  const [editType, setEditType] = useState('');
  const [showReference, setShowReference] = useState(false);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['project', String(projectId)] });

  const addMutation = useMutation({
    mutationFn: ({ label, decisionType }) => api.createDecision(projectId, label, decisionType || undefined),
    onSuccess: invalidate,
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, fields }) => api.updateDecision(id, fields),
    onSuccess: invalidate,
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => api.deleteDecision(id),
    onSuccess: invalidate,
  });
  const reorderMutation = useMutation({
    mutationFn: (decisionIds) => api.reorderDecisions(projectId, decisionIds),
    onSuccess: invalidate,
  });

  const sorted = [...decisions].sort((a, b) => a.position - b.position);

  function move(decision, direction) {
    const idx = sorted.findIndex(d => d.id === decision.id);
    const swapIdx = idx + direction;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const newOrder = [...sorted];
    [newOrder[idx], newOrder[swapIdx]] = [newOrder[swapIdx], newOrder[idx]];
    reorderMutation.mutate(newOrder.map(d => d.id));
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!newLabel.trim()) return;
    addMutation.mutate({ label: newLabel.trim(), decisionType: newType || undefined });
    setNewLabel('');
    setNewType('');
  }

  function startEdit(decision) {
    setEditingId(decision.id);
    setEditLabel(decision.label);
    setEditType(decision.decisionType || '');
  }

  function submitEdit(e, decision) {
    e.preventDefault();
    if (!editLabel.trim()) return;
    updateMutation.mutate({ id: decision.id, fields: { label: editLabel.trim(), decisionType: editType || null } });
    setEditingId(null);
  }

  function handleDelete(decision) {
    if (window.confirm(`Remove decision "${decision.label}"?`)) {
      deleteMutation.mutate(decision.id);
    }
  }

  return (
    <div className="decision-list">
      <button type="button" className="reference-toggle" onClick={() => setShowReference(v => !v)}>
        {showReference ? 'Hide' : 'Show'} the 10 types of decisions (reference)
      </button>
      {showReference && (
        <ul className="decision-type-reference">
          {DECISION_TYPES.map(t => (
            <li key={t.label}><strong>{t.label}</strong> — {t.description}</li>
          ))}
        </ul>
      )}

      {sorted.length === 0 && <p>No decisions yet — add the first one below.</p>}
      <ul className="decision-items">
        {sorted.map((decision, idx) => (
          <li key={decision.id} className="decision-item">
            {editingId === decision.id ? (
              <form onSubmit={e => submitEdit(e, decision)} className="decision-edit-form">
                <input value={editLabel} onChange={e => setEditLabel(e.target.value)} autoFocus />
                <select value={editType} onChange={e => setEditType(e.target.value)}>
                  <option value="">No type tag</option>
                  {DECISION_TYPES.map(t => <option key={t.label} value={t.label}>{t.label}</option>)}
                </select>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <div className="decision-item-text" onClick={() => startEdit(decision)}>
                  <span className="decision-label">{decision.label}</span>
                  {decision.decisionType && <span className="decision-type-tag">{decision.decisionType}</span>}
                </div>
                <div className="decision-item-controls">
                  <button title="Move up" onClick={() => move(decision, -1)} disabled={idx === 0}>&uarr;</button>
                  <button title="Move down" onClick={() => move(decision, 1)} disabled={idx === sorted.length - 1}>&darr;</button>
                  <button title="Delete" onClick={() => handleDelete(decision)}>&times;</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={handleAdd} className="decision-add-form">
        <input
          placeholder="Add a decision (e.g. how aggressively to expand the pilot)"
          value={newLabel}
          onChange={e => setNewLabel(e.target.value)}
        />
        <select value={newType} onChange={e => setNewType(e.target.value)}>
          <option value="">No type tag</option>
          {DECISION_TYPES.map(t => <option key={t.label} value={t.label}>{t.label}</option>)}
        </select>
        <button type="submit">Add decision</button>
      </form>
    </div>
  );
}
