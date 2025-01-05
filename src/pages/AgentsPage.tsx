import React, { useState } from 'react';
import { Plus, Bot, ChevronDown } from 'lucide-react';
import { Modal } from '../components/Modal';
import { FileUpload } from '../components/FileUpload';
import { uploadFile } from '../services/fileService';
import { Agent } from '../types/agent';

export function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: '',
    description: '',
    welcome_message: '',
  });

  const handleLogout = () => {
    // Remove cookies
    document.cookie = 'user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    document.cookie = 'email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    document.cookie = 'is_verified=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    console.log('User logged out and cookies cleared');
    // Optionally, redirect the user to a login page
    window.location.href = '/'; // Update with the actual login route
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/create-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAgent),
      });

      if (!response.ok) {
        throw new Error('Failed to create agent');
      }

      const createdAgent = await response.json();
      setAgents([...agents, createdAgent]);
      setNewAgent({ name: '', description: '', welcome_message: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating agent:', error);
    }
  };

  const handleFileUpload = async (agentId: string, file: File) => {
    try {
      await uploadFile(agentId, file);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Agents</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              <Plus className="w-5 h-5" />
              Create Agent
            </button>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-200"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-50 p-2 rounded-lg">
                  <Bot className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{agent.name}</h3>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">{agent.description}</p>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm font-medium text-gray-600 mb-2">Welcome Message:</p>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg text-sm">
                  {agent.welcomeMessage}
                </p>
              </div>
              <FileUpload agentId={agent.id} onFileSelect={handleFileUpload} />
            </div>
          ))}
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Agent</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Agent Name
              </label>
              <input
                type="text"
                id="name"
                value={newAgent.name}
                onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                value={newAgent.description}
                onChange={(e) =>
                  setNewAgent({ ...newAgent, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
                required
              />
            </div>
            <div>
              <label
                htmlFor="welcomeMessage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Welcome Message
              </label>
              <textarea
                id="welcomeMessage"
                value={newAgent.welcome_message}
                onChange={(e) =>
                  setNewAgent({ ...newAgent, welcome_message: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows={2}
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Create Agent
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
