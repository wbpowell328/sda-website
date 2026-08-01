import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client.js';

const RATING_LABELS = { H: 'High', M: 'Medium', L: 'Low', N: 'None' };

// Metrics as columns (pyramid order, highest priority first), decisions as
// rows (list order). Both are derived from the same project data used by
// the pyramid builder and decision list, so reordering or editing either
// one there is automatically reflected here on next load — this view never
// stores its own copy of "what the matrix looks like".
export default function MatrixEditor({ projectId, metrics, decisions, matrixCells }) {
  const queryClient = useQueryClient();

  const sortedMetrics = [...metrics].sort((a, b) => (a.level - b.level) || (a.position - b.position));
  const sortedDecisions = [...decisions].sort((a, b) => a.position - b.position);

  const cellMap = new Map(matrixCells.map(c => [`${c.decisionId}:${c.metricId}`, c.rating]));

  const setCellMutation = useMutation({
    mutationFn: ({ decisionId, metricId, rating }) => api.setMatrixCell(decisionId, metricId, rating),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['project', String(projectId)] }),
  });

  if (sortedMetrics.length === 0 || sortedDecisions.length === 0) {
    return (
      <p>
        Add at least one metric (in the Metric pyramid tab) and one decision (in the Decisions tab)
        before filling in the impact matrix.
      </p>
    );
  }

  function handleChange(decisionId, metricId, rating) {
    setCellMutation.mutate({ decisionId, metricId, rating });
  }

  return (
    <div className="matrix-editor-wrap">
      <table className="matrix-editor">
        <thead>
          <tr>
            <th></th>
            {sortedMetrics.map(metric => (
              <th key={metric.id} title={`Level ${metric.level}`}>{metric.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedDecisions.map(decision => (
            <tr key={decision.id}>
              <th scope="row">{decision.label}</th>
              {sortedMetrics.map(metric => {
                const rating = cellMap.get(`${decision.id}:${metric.id}`) || 'N';
                return (
                  <td key={metric.id} className={`hml-cell hml-${rating.toLowerCase()}`}>
                    <select
                      aria-label={`Impact of "${decision.label}" on "${metric.label}"`}
                      value={rating}
                      onChange={e => handleChange(decision.id, metric.id, e.target.value)}
                    >
                      {Object.entries(RATING_LABELS).map(([code, name]) => (
                        <option key={code} value={code}>{code} — {name}</option>
                      ))}
                    </select>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
