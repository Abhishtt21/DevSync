import React from 'react';
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
  const Navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-center items-center p-6">
    <h2 className="text-4xl mb-6 font-bold text-orange-500">Welcome to DevSync</h2>
    <p className="text-lg mb-6 text-center max-w-2xl leading-relaxed">
      DevSync is a collaborative code editor where you can create or join rooms, chat, write code together, and run it in real-time. 
      Enhance your coding experience by working alongside your teammates in a seamless environment.
    </p>
    <button
      onClick={() => Navigate("/auth")}
      className="bg-orange-500 hover:bg-orange-600 text-gray-100 font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200"
    >
      Get Started
    </button>
  </div>
  
  );
};

export default Home;
