import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { VerifyPage } from './pages/VerifyPage';
import { AgentsPage } from './pages/AgentsPage';

function App() {
  return (
    <BrowserRouter>
      <AuthCheck>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/agents" element={<AgentsPage />} />
        </Routes>
      </AuthCheck>
    </BrowserRouter>
  );
}

// AuthCheck component to handle cookie checks and redirections
const AuthCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const getCookie = (name: string): string | null => {
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split('=')[1]) : null;
  };

  useEffect(() => {
    const email = getCookie('email');
    const userId = getCookie('user_id');
    const isVerified = getCookie('is_verified');

    if (email && userId && isVerified === 'true') {
      navigate('/agents'); // Redirect to agents page if all cookies are valid
    }
  }, [navigate]);

  return <>{children}</>;
};

export default App;
