import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { VerifyPage } from './pages/VerifyPage';
import { AgentsPage } from './pages/AgentsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/agents" element={<AgentsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
