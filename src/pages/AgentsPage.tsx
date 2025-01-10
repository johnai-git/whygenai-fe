import React, { useState, useEffect } from 'react';
import { Plus, Bot, ChevronDown } from 'lucide-react';
import { Modal } from '../components/Modal';
import { FileUpload } from '../components/FileUpload';
import { uploadFile } from '../services/fileService';
import { Agent } from '../types/agent';
import { ToastContainer, toast } from 'react-toastify';

export function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: '',
    description: '',
    welcome_message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingAgent, setIsCreatingAgent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false); // Success message state

  const getUserIdFromCookies = (): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; user_id=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  console.log({errorMessage});
  const fetchAgents = async () => {
    const userId = getUserIdFromCookies();
    if (!userId) {
      console.error('User ID not found in cookies');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`http://54.243.34.91:8000/user-agents/${userId}`);
      // const response = await fetch(`http://127.0.0.1:8001/user-agents/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch agents');
      }
      const fetchedAgents = await response.json();
      setAgents(fetchedAgents);
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleLogout = () => {
    document.cookie = 'user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    document.cookie = 'email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    document.cookie = 'is_verified=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    console.log('User logged out and cookies cleared');
    window.location.href = '/';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = getUserIdFromCookies();
    if (!userId) {
      console.error('User ID not found in cookies');
      return;
    }

    const payload = {
      ...newAgent,
      user_id: userId,
    };

    setIsCreatingAgent(true);
    setErrorMessage(''); // Clear previous errors

    try {
      // const response = await fetch('http://127.0.0.1:8001/create-agent', {
      const response = await fetch('http://54.243.34.91:8000/create-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 409) {
          const data = await response.json();
          setErrorMessage(data.detail); // Set error message when conflict occurs
        } else {
          throw new Error('Failed to create agent');
        }
      } else {
        const createdAgent = await response.json();
        setAgents([...agents, createdAgent]);
        setNewAgent({ name: '', description: '', welcome_message: '' });
        setIsModalOpen(false);
        fetchAgents();
        toast.success('Agent Created Successfully!');

        // Show success message
        setIsSuccessMessageVisible(true);
        // Hide the success message after 3 seconds
        setTimeout(() => setIsSuccessMessageVisible(false), 3000);
      }
    } catch (error) {
      console.error('Error creating agent:', error);
    } finally {
      setIsCreatingAgent(false);
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

        {isLoading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-indigo-600"></div>
            <p className="text-gray-600">Loading agents...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => {
              return (
                <div
                  key={agent?.agent_id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition duration-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-indigo-50 p-2 rounded-lg">
                      <Bot className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{agent.agent_name}</h3>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">{agent.s3_bucket}</p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">S3 Bucket:</p>
                    <p className="text-gray-800 bg-gray-50 p-3 rounded-lg text-sm">{agent.s3_bucket}</p>
                  </div>
                  <FileUpload bucket_name={agent.s3_bucket} onFileSelect={handleFileUpload} />
                </div>
              );
            })}
          </div>
        )}
       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Agent</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
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
                {isCreatingAgent ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-indigo-600"></div>
                    <span className="ml-2">Creating...</span>
                  </div>
                ) : (
                  'Create Agent'
                )}
              </button>
            </div>
          </form>
        </Modal>
      </div>
      <ToastContainer />

    </div>
  );
}
