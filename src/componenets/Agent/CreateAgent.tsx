import React, { useState } from 'react';

interface CreateAgentProps {
  onClose: () => void;
}

const CreateAgent: React.FC<CreateAgentProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleSubmit = () => {
    console.log({ name, description, welcomeMessage });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Create Agent</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Agent Name</label>
            <input
              className="w-full px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              type="text"
              placeholder="Enter unique agent name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="w-full px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Welcome Message</label>
            <input
              className="w-full px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              type="text"
              placeholder="Enter welcome message"
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
            />
          </div>
        </form>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-primary rounded-lg hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Create Agent
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAgent;
