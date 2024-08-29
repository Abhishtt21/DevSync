import React, { useState } from 'react';
import { useUserStore } from '../store';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from '@chakra-ui/react'; // Import Chakra UI Spinner

const Auth: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false); // State for submitting
  const { setUsername } = useUserStore();
  const Navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !password) {
      toast.error("Enter name and password");
      return;
    }

    setSubmitting(true); // Set submitting state to true

    let url = ""

    if(import.meta.env.VITE_REACT_APP_SERVER_URL === "://localhost:8080"){
      url = isSignIn
      ? `http${import.meta.env.VITE_REACT_APP_SERVER_URL}/signin`
      : `http${import.meta.env.VITE_REACT_APP_SERVER_URL}/signup`;
    }
    else{
      url = isSignIn
      ? `https${import.meta.env.VITE_REACT_APP_SERVER_URL}/signin`
      : `https${import.meta.env.VITE_REACT_APP_SERVER_URL}/signup`;
    }


    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ username: name, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        setUsername(name);
        Navigate("/join");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error)
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 text-gray-800">
  {/* Left Side - Sign In/Sign Up Form */}
  <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-white shadow-lg">
    <Toaster />
    <h2 className="text-4xl font-bold text-blue-600 mb-6">
      {isSignIn ? 'Sign In' : 'Sign Up'}
    </h2>
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-xs">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-gray-200 w-full text-gray-800 border-b-2 border-orange-400 rounded mb-4 px-4 py-2 focus:outline-none focus:border-orange-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-gray-200 w-full text-gray-800 border-b-2 border-orange-400 rounded mb-4 px-4 py-2 focus:outline-none focus:border-orange-500"
      />
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded w-full transition duration-200 ease-in-out"
        disabled={submitting} // Disable button while submitting
      >
        {submitting ? <Spinner size="sm" color="white" /> : (isSignIn ? 'Sign In' : 'Sign Up')}
      </button>
    </form>
    <p className="mt-6 text-blue-600">
      {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
      <button
        onClick={toggleAuthMode}
        className="text-orange-500 hover:text-orange-400 font-medium focus:outline-none"
      >
        {isSignIn ? 'Sign Up' : 'Sign In'}
      </button>
    </p>
  </div>

  {/* Right Side - Image */}
  <div className="hidden md:flex md:w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(/image.jpg)' }}>
    {/* You can replace the URL with your preferred image */}
  </div>
</div>

  

  );
};

export default Auth;
