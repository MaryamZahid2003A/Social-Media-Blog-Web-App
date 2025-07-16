import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalStore from '../Store/GlobalStore';
import axios from 'axios';

export default function Header() {
  const { user, fetchUser, loading } = useGlobalStore();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  

  const handleLogout = async () => {
    await axios.get('http://localhost:5000/api/user/logout', { withCredentials: true });
    navigate('/');
    window.location.reload();
  };

  const handleLogin = () => {
    setToggle(false);
    navigate('/login');
  };

  const handleSignUp = () => {
    setToggle(true);
    navigate('/signup');
  };

  useEffect(() => {
    fetchUser();
  }, []); 

  return (
    <header className="flex justify-between items-center px-6 pt-4 bg-transparent shadow-md">
      <div className="flex items-center gap-2 text-white text-3xl font-extrabold tracking-wide font-serif">
        <button onClick={() => navigate('/')}>
          <span className="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-500 bg-clip-text text-transparent">
            BlogSpace
          </span>
        </button>
      </div>

      {user === null ? (
        <div className="flex border-2 border-blue-900 rounded-xl">
          <button
            onClick={handleLogin}
            className={`px-6 py-2 rounded-xl text-white transition cursor-pointer ${
              toggle ? 'hover:text-white' : 'bg-blue-900 hover:bg-blue-950'
            }`}
          >
            Login
          </button>
          <button
            onClick={handleSignUp}
            className={`px-6 py-2 rounded-xl text-white transition cursor-pointer ${
              !toggle ? 'hover:text-white' : 'bg-blue-900 hover:bg-blue-950'
            }`}
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <p className="text-white">Welcome, {user.firstname}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 cursor-pointer hover:bg-red-600 px-4 py-2 rounded-xl text-white"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
