import React, { useState, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

interface LocationState {
  email: string;
}

export function VerifyPage() {
  const [code, setCode] = useState<string>(''); // Explicitly specify the type as string
  const [loading, setLoading] = useState<boolean>(false); // Type is boolean
  const [error, setError] = useState<string>(''); // Type is string
  const [resending, setResending] = useState<boolean>(false); // State for resend action
  const [successMessage, setSuccessMessage] = useState<string>(''); // State for success messages
  const location = useLocation();
  const navigate = useNavigate();
  const email = (location.state as LocationState)?.email;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
  
    try {
      // const response = await fetch('http://127.0.0.1:8000/verify-code/', {
      const response = await fetch('http://54.243.34.91:8000/verify-code/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });
  
      if (response.ok) {
        const data: { message: string } = await response.json();
        alert(data.message);
        navigate('/agents');
      } else {
        const errorData: { detail?: string } = await response.json();
        setError(errorData.detail || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleResendCode = async () => {
    setResending(true);
    setError('');
    setSuccessMessage('');
  
    try {
      // const response = await fetch('http://127.0.0.1:8000/send-code', {
      const response = await fetch('http://54.243.34.91:8000/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        const data: { message: string } = await response.json();
        setSuccessMessage(data.message);
      } else {
        const errorData: { detail?: string } = await response.json();
        setError(errorData.detail || 'Failed to resend verification code. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setResending(false);
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <ShieldCheck className="w-12 h-12 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Verify Your Email
        </h1>
        <p className="text-center text-gray-600 mb-8">
          We've sent a verification code to {email}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter verification code"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg text-white ${
              loading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'
            } transition duration-200`}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={handleResendCode}
            className="text-indigo-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={resending}
          >
            {resending ? 'Resending...' : 'Resend Code'}
          </button>
        </div>
      </div>
    </div>
  );
}
