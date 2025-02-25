import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bot } from "lucide-react";

export function HomePage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) return;

    // Check if user is already verified
    // const isVerified = document.cookie
    //   .split("; ")
    //   .find((row) => row.startsWith("is_verified="))
    //   ?.split("=")[1];

    // if (isVerified === "true") {
    //   setError("You are already verified. Please proceed to the Agents page.");
    //   return;
    // }

    setLoading(true);
    try {
      // Call API to send verification code
      // const response = await fetch("http://54.243.34.91:8000/send-code", {
      const response = await fetch("http://127.0.0.1:8000/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Save user_id and email in cookies
      document.cookie = `user_id=${data.user_id};`;
      document.cookie = `email=${data.email};`;
      document.cookie = `is_verified=${data.is_verified};`;

      // Navigate to the VerifyPage and pass the email as state
      navigate("/verify", { state: { email } });
    } catch (err) {
      console.error("API Call Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Bot className="w-12 h-12 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome to Whygenai.com</h1>
        <p className="text-center text-gray-600 mb-8">Create and manage your AI agents in one place</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Get Started"}
          </button>
        </form>
      </div>
    </div>
  );
}

// export function HomePage() {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');
//     if (!email) return;
//     setLoading(true);
//     try {
//       // First, check if the user is verified by calling the new API
//       const verificationResponse = await fetch('http://54.243.34.91:8000/is-user-verified/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const verificationData = await verificationResponse.json();

//       if (verificationResponse.ok) {
//         console.log('API Response:', verificationData);
  
//         // Save user_id and email in cookies
//         document.cookie = `user_id=${verificationData.user_id};`;
//         document.cookie = `email=${verificationData.email};`;
//         document.cookie = `is_verified=${verificationData.is_verified};`;
//         // If the user is already verified, redirect to the Agents page
//         if (verificationData.is_verified) {
//           setMessage('You are already verified. Redirecting to the Agents page...');
//           navigate('/agents'); // Redirect to the Agents page
//           return; // Prevent further execution
//         }
//       } else {
//         // If the user does not exist or an error occurred, show error
//         setError(verificationData.message || 'Something went wrong. Please try again.');
//         return;
//       }

//       // If user is not verified, proceed to send the code
//       const response = await fetch('http://54.243.34.91:8000/send-code', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log('API Response:', data);

//       // Save user_id and email in cookies
//       document.cookie = `user_id=${data.user_id};`;
//       document.cookie = `email=${data.email};`;
//       document.cookie = `is_verified=${data.is_verified};`;

//       // Navigate to the VerifyPage and pass the email as state
//       navigate('/verify', { state: { email } });
//     } catch (err) {
//       console.error('API Call Error:', err);
//       setError('Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
//         <div className="flex justify-center mb-6">
//           <Bot className="w-12 h-12 text-indigo-600" />
//         </div>
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome to Whygenai.com</h1>
//         <p className="text-center text-gray-600 mb-8">Create and manage your AI agents in one place</p>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           {message && <p className="text-green-500 text-sm">{message}</p>}
//           <button
//             type="submit"
//             className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             disabled={loading}
//           >
//             {loading ? 'Sending...' : 'Get Started'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
