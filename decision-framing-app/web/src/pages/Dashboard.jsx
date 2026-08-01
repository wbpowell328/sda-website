import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client.js';
import { useAuth } from '../auth.jsx';

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState('');
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.listProjects().then(d => d.projects),
  });

  const createMutation = useMutation({
    mutationFn: (name) => api.createProject(name),
    onSuccess: () => {
      setNewName('');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const renameMutation = useMutation({
    mutationFn: ({ id, name }) => api.renameProject(id, name),
    onSuccess: () => {
      setRenamingId(null);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.deleteProject(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });

  async function handleLogout() {
    await api.logout();
    setUser(null);
    navigate('/login');
  }

  function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    createMutation.mutate(newName.trim());
  }

  function startRename(project) {
    setRenamingId(project.id);
    setRenameValue(project.name);
  }

  function submitRename(e, id) {
    e.preventDefault();
    if (!renameValue.trim()) return;
    renameMutation.mutate({ id, name: renameValue.trim() });
  }

  function handleDelete(project) {
    if (window.confirm(`Delete "${project.name}"? This cannot be undone.`)) {
      deleteMutation.mutate(project.id);
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Your decision framing projects</h1>
        <div className="dashboard-header-right">
          <span>{user?.email}</span>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </header>

      <form className="new-project-form" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder='e.g. "Improving dispatch model acceptance"'
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <button type="submit" disabled={createMutation.isPending}>New project</button>
      </form>
      {createMutation.isError && <p className="form-error">{createMutation.error.message}</p>}

      {isLoading && <p>Loading…</p>}
      <ul className="project-list">
        {data?.map(project => (
          <li key={project.id} className="project-list-item">
            {renamingId === project.id ? (
              <form onSubmit={e => submitRename(e, project.id)} className="rename-form">
                <input
                  type="text"
                  value={renameValue}
                  onChange={e => setRenameValue(e.target.value)}
                  autoFocus
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setRenamingId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
                <div className="project-list-actions">
                  <button onClick={() => startRename(project)}>Rename</button>
                  <button onClick={() => handleDelete(project)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      {data?.length === 0 && <p>No projects yet — create one above to get started.</p>}
    </div>
  );
}
