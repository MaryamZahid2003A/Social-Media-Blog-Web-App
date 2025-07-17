import React from 'react';
import '../App.css';
import { FcGoogle } from "react-icons/fc";
import { BsEyeSlash } from "react-icons/bs";
import { SlEye } from "react-icons/sl";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import useGlobalStore from '../Store/GlobalStore';
import { useEffect } from 'react';


export default function Login() {
    const { user, fetchUser, loading } = useGlobalStore();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [visibility,setVisibility]=useState(false);
    const navigate=useNavigate();

    const handleLogin =async(e)=>{
        e.preventDefault();
        try{
          const res = await axios.post("http://localhost:5000/api/user/login",{
            email,
            password
          },{
            withCredentials:true
          })
          console.log("hello here")
          if (res.status===400){
            toast.error(res.data.message);
          }
          console.log(res.data.user)
          toast.success(res.data.message);
          await fetchUser();
          navigate('/blogPage')
        }
        catch(error){
          console.log(error);
          const errorMsg = error.response?.data?.message || "Login Failed";
          toast.error(errorMsg);
        }
      }
    
      const handleVisible=(e)=>{
        e.preventDefault();
        setVisibility(!visibility);
      }
    
  const googleLogin=()=>{
    window.location.href='http://localhost:5000/auth/google'
  }
  return (
    <div className="login flex justify-center min-h-screen ">
    
      <div className="login flex flex-col justify-center items-center text-white px-6 w-1/2">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-6 text-center">Login to BlogSpace</h2>
          <form>
            <div className="pb-6 border-b border-gray-700">
              <p className="mt-1 text-sm text-gray-400">
                Use your registered credentials to log in.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  className="mt-1 w-full rounded-md bg-[#18173a] text-white px-4 py-3 text-base focus:outline focus:outline-2 focus:outline-blue-600"
                />
              </div>
               <div className="sm:col-span-2 relative">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={visibility ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-[#18173a] text-white px-4 py-3 text-base focus:outline focus:outline-2 focus:outline-blue-600"
                  />
                  <span
                    onClick={handleVisible}
                    className="absolute right-4 top-9 cursor-pointer text-xl text-white"
                  >
                    {visibility ? <SlEye /> : <BsEyeSlash />}
                  </span>
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 w-full">
              <button
                type="submit"
                className="bg-blue-600  cursor-pointer hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md transition"
                onClick={handleLogin}
              >
                Log In
              </button>
              <button
                type="button"
                className="bg-white cursor-pointer hover:bg-red-50 text-black font-medium py-2 px-6 rounded-md transition flex items-center justify-center gap-2"
                onClick={googleLogin}
              >
                <FcGoogle className="text-xl" />
                Continue with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
