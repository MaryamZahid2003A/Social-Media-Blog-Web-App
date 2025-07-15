import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function MainPage() {
    const navigate=useNavigate();
  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gradient-to-br  text-white px-6 py-12">
      <div className="max-w-2xl text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4 animate-fade-in">
          Welcome to <span className="text-white">BlogSpace</span>
        </h1>
        
        <p className="text-lg md:text-xl text-blue-200 leading-relaxed mb-6 animate-slide-in">
          Whether you're here to <span className="italic text-white">read</span>,{' '}
          <span className="italic text-white">write</span>, or{' '}
          <span className="italic text-white">reflect</span> —
          you're in the right place. <br />
          Let’s build something meaningful together 💡.
        </p>

        <button
          className="mt-4 inline-block cursor-pointer bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-3 rounded-md shadow-md hover:scale-105"
          onClick={() => navigate("/signup")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
