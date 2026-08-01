import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './auth.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProjectEditor from './pages/ProjectEditor.jsx';

const queryClient = new QueryClient();

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <p>Loading…</p>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function Routed() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/projects/:id" element={<ProtectedRoute><ProjectEditor /></ProtectedRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routed />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
