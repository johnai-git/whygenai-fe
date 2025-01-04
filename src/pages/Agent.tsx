import React, { useState } from 'react';
import CreateAgent from '../components/Agent/CreateAgent';

const Agents: React.FC = () => {
  const [showCreateAgentModal, setShowCreateAgentModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Your Agents</h1>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">Create and manage your agents effortlessly.</p>
        <button
          className="px-6 py-3 text-white bg-blue-500 rounded-full hover:bg-blue-600 shadow-md"
          onClick={() => setShowCreateAgentModal(true)}
        >
          + Create Agent
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for agent cards */}
        <div className="p-4 bg-white rounded shadow-md">Agent 1</div>
        <div className="p-4 bg-white rounded shadow-md">Agent 2</div>
      </div>
      {showCreateAgentModal && <CreateAgent onClose={() => setShowCreateAgentModal(false)} />}
    </div>
  );
};

export default Agents;
