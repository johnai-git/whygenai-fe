import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-50">
      <h1 className="mb-6 text-4xl font-bold text-primary">
        Welcome to the Agent Platform
      </h1>
      <p className="mb-8 text-lg text-secondary">
        Easily manage your agents and data sources with our platform.
      </p>
      <button
        className="px-6 py-3 text-lg font-medium text-white transition-all bg-primary rounded-lg hover:bg-blue-600 shadow-lg"
        onClick={() => navigate('/agents')}
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
