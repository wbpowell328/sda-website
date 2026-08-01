import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client.js';
import PyramidBuilder from '../components/PyramidBuilder.jsx';
import DecisionList from '../components/DecisionList.jsx';
import MatrixEditor from '../components/MatrixEditor.jsx';

const TABS = ['Metric pyramid', 'Decisions', 'Impact matrix'];

export default function ProjectEditor() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const { data, isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: () => api.getProject(id),
  });

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p className="form-error">{error.message}</p>;

  return (
    <div className="project-editor">
      <p><Link to="/">&larr; Back to projects</Link></p>
      <h1>{data.project.name}</h1>

      <div className="tab-bar">
        {TABS.map(tab => (
          <button
            key={tab}
            className={tab === activeTab ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Metric pyramid' && (
        <PyramidBuilder projectId={id} metrics={data.metrics} />
      )}
      {activeTab === 'Decisions' && (
        <DecisionList projectId={id} decisions={data.decisions} />
      )}
      {activeTab === 'Impact matrix' && (
        <MatrixEditor
          projectId={id}
          metrics={data.metrics}
          decisions={data.decisions}
          matrixCells={data.matrixCells}
        />
      )}
    </div>
  );
}
