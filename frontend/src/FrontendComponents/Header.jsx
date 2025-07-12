import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Header() {
  const [toggle, setToggle] = useState(false);
  const navigate=useNavigate();
  const handleLogin = () => {
    setToggle(!toggle);
    navigate('/login')
  };

  const handleSignUp = () => {
    setToggle(!toggle);
    navigate('/signup')
  };

  return (
    <header className="flex justify-between items-center px-6 pt-4 bg-transparent shadow-md">
      <div className="flex items-center gap-2 text-white text-3xl font-extrabold tracking-wide font-serif ">
        <button onClick={()=>navigate('/')}>
        <span className="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-500 bg-clip-text text-transparent">
            BlogSpace
        </span>
        </button>
        </div>
      <div className="flex border border-blue-900 rounded-xl ">
        <button
          onClick={handleLogin}
          className={`px-6 py-2 rounded-xl text-white transition cursor-pointer ${
            !toggle ? 'bg-blue-900' : ' hover:text-white'
          }`}
        >
          Login
        </button>
        <button
          onClick={handleSignUp}
          className={`${toggle ? 'bg-blue-900 hover:bg-blue-950' : 'text-white'} text-white px-6 py-2 rounded-xl transition cursor-pointer`}
        >
          Sign Up
        </button>
      </div>
    </header>
  );
}
