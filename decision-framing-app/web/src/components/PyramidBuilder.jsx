import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client.js';

function groupByLevel(metrics) {
  const map = new Map();
  for (const m of metrics) {
    if (!map.has(m.level)) map.set(m.level, []);
    map.get(m.level).push(m);
  }
  for (const arr of map.values()) arr.sort((a, b) => a.position - b.position);
  return map;
}

function levelsPayloadFromMap(map) {
  return Array.from(map.entries()).map(([level, metrics]) => ({
    level,
    metricIds: metrics.map(m => m.id),
  }));
}

// Metric pyramid editor: level 0 = top = most important, higher level number
// = lower priority. Within a level, left-to-right position is priority order.
// Move buttons (not drag-and-drop) are both the MVP mechanism and the
// keyboard-accessible path.
export default function PyramidBuilder({ projectId, metrics }) {
  const queryClient = useQueryClient();
  const [newLabels, setNewLabels] = useState({});
  const [newLevelLabel, setNewLevelLabel] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['project', String(projectId)] });

  const addMutation = useMutation({
    mutationFn: ({ label, level }) => api.createMetric(projectId, label, level),
    onSuccess: invalidate,
  });
  const renameMutation = useMutation({
    mutationFn: ({ id, label }) => api.renameMetric(id, label),
    onSuccess: invalidate,
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => api.deleteMetric(id),
    onSuccess: invalidate,
  });
  const reorderMutation = useMutation({
    mutationFn: (levels) => api.reorderMetrics(projectId, levels),
    onSuccess: invalidate,
  });

  const byLevel = groupByLevel(metrics);
  const levelNumbers = Array.from(byLevel.keys()).sort((a, b) => a - b);
  const maxLevel = levelNumbers.length ? Math.max(...levelNumbers) : -1;

  function sendReorder(map) {
    reorderMutation.mutate(levelsPayloadFromMap(map));
  }

  function moveWithinLevel(metric, direction) {
    const arr = byLevel.get(metric.level);
    const idx = arr.findIndex(m => m.id === metric.id);
    const swapIdx = idx + direction;
    if (swapIdx < 0 || swapIdx >= arr.length) return;
    const newArr = [...arr];
    [newArr[idx], newArr[swapIdx]] = [newArr[swapIdx], newArr[idx]];
    const newMap = new Map(byLevel);
    newMap.set(metric.level, newArr);
    sendReorder(newMap);
  }

  function moveBetweenLevels(metric, direction) {
    const targetLevel = metric.level + direction;
    if (targetLevel < 0) return;
    const newMap = new Map(byLevel);
    const sourceArr = newMap.get(metric.level).filter(m => m.id !== metric.id);
    newMap.set(metric.level, sourceArr);
    const targetArr = newMap.has(targetLevel) ? [...newMap.get(targetLevel)] : [];
    targetArr.push(metric);
    newMap.set(targetLevel, targetArr);
    sendReorder(newMap);
  }

  function handleAddToLevel(e, level) {
    e.preventDefault();
    const label = (newLabels[level] || '').trim();
    if (!label) return;
    addMutation.mutate({ label, level });
    setNewLabels(prev => ({ ...prev, [level]: '' }));
  }

  function handleAddNewLevel(e) {
    e.preventDefault();
    const label = newLevelLabel.trim();
    if (!label) return;
    addMutation.mutate({ label, level: maxLevel + 1 });
    setNewLevelLabel('');
  }

  function startEdit(metric) {
    setEditingId(metric.id);
    setEditValue(metric.label);
  }

  function submitEdit(e, metric) {
    e.preventDefault();
    if (!editValue.trim()) return;
    renameMutation.mutate({ id: metric.id, label: editValue.trim() });
    setEditingId(null);
  }

  function handleDelete(metric) {
    if (window.confirm(`Remove metric "${metric.label}"?`)) {
      deleteMutation.mutate(metric.id);
    }
  }

  return (
    <div className="pyramid-builder">
      <p className="hint">Level 0 (top) is most important. Within a level, priority runs left to right.</p>
      {levelNumbers.length === 0 && <p>No metrics yet — add the first one below.</p>}
      {levelNumbers.map(level => {
        const levelMetrics = byLevel.get(level);
        return (
          <div key={level} className="pyramid-level">
            <div className="pyramid-level-label">Level {level}</div>
            <div className="pyramid-level-row">
              {levelMetrics.map((metric, idx) => (
                <div key={metric.id} className="pyramid-card">
                  {editingId === metric.id ? (
                    <form onSubmit={e => submitEdit(e, metric)} className="pyramid-edit-form">
                      <input value={editValue} onChange={e => setEditValue(e.target.value)} autoFocus />
                      <button type="submit">Save</button>
                      <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                    </form>
                  ) : (
                    <>
                      <button type="button" className="pyramid-card-label" onClick={() => startEdit(metric)}>
                        {metric.label}
                      </button>
                      <div className="pyramid-card-controls">
                        <button title="Move up a level" onClick={() => moveBetweenLevels(metric, -1)} disabled={metric.level === 0}>&uarr;</button>
                        <button title="Move down a level" onClick={() => moveBetweenLevels(metric, 1)}>&darr;</button>
                        <button title="Move left" onClick={() => moveWithinLevel(metric, -1)} disabled={idx === 0}>&larr;</button>
                        <button title="Move right" onClick={() => moveWithinLevel(metric, 1)} disabled={idx === levelMetrics.length - 1}>&rarr;</button>
                        <button title="Delete" onClick={() => handleDelete(metric)}>&times;</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              <form onSubmit={e => handleAddToLevel(e, level)} className="pyramid-add-form">
                <input
                  placeholder="Add metric to this level"
                  value={newLabels[level] || ''}
                  onChange={e => setNewLabels(prev => ({ ...prev, [level]: e.target.value }))}
                />
                <button type="submit">+</button>
              </form>
            </div>
          </div>
        );
      })}
      <form onSubmit={handleAddNewLevel} className="pyramid-add-level-form">
        <input
          placeholder={levelNumbers.length ? `Add a new, lower-priority level (${maxLevel + 1})` : 'Name your first, most important metric'}
          value={newLevelLabel}
          onChange={e => setNewLevelLabel(e.target.value)}
        />
        <button type="submit">Add new level</button>
      </form>
    </div>
  );
}
