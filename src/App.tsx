import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './page/signup/signup';
import Login from './page/login/login';
import DashBoard from './page/dashBoard/dashBoard';
import ReadPage from './page/dashBoard/screen/readBlog';
import EditImagePost from './page/dashBoard/screen/editBlogPost';
import { useAuth } from './hooks/authContext';

function App() {
  const { isLoggedIn } = useAuth(); // Use the auth context directly

  // If still loading (isLoggedIn is null or undefined), show loading message
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  // Protected Route Component
  function ProtectedRoute({ children }: { children: React.ReactNode }) {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  }

  return (
    <main>
      <Routes>
        {/* Protected Routes for logged-in users */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute>
              <ReadPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditImagePost />
            </ProtectedRoute>
          }
        />

        {/* Routes for unauthenticated users */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? '/' : '/login'} replace />} />
      </Routes>
    </main>
  );
}

export default App;
