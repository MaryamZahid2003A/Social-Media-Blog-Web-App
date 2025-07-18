import React, { useEffect, useState } from 'react';
import '../App.css'; 
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { BsEyeSlash } from "react-icons/bs";
import { SlEye } from "react-icons/sl";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useGlobalStore from '../Store/GlobalStore';

export default function Signup() {
  const { user, fetchUser, loading } = useGlobalStore();
  const [firstname,setFirstname]=useState('');
  const [lastname,setLastname]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [visibility,setVisibility]=useState(false);
  const navigate=useNavigate();
  const handleSignup =async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:5000/api/user/signup",{
        firstname,
        lastname,
        email,
        password
      },{
        withCredentials:true
      })
      if (res.status===400){
        toast.error(res.data.message);
      }
      console.log(res.data.savedUser)
      toast.success(res.data.message);
      toast.success("Login Your Account !")
      navigate('/login')
    }
    catch(error){
      console.log(error);
      const errorMsg = error.response?.data?.message || "Signup failed!";
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
        <div className="login flex justify-center items-center min-h-screen p-4 sm:p-10 ">
      <div className="flex flex-col justify-center items-center text-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5  rounded-lg p-6 sm:p-10 shadow-md">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center">Sign Up to BlogSpace</h2>

        <form className="w-full">
          <div className="pb-4 border-b border-gray-700 text-center">
            <p className="text-sm text-gray-400">Use your credentials to create an account</p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-200">
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="block w-full rounded-md bg-[#18173a] text-white px-4 py-2 text-sm sm:text-base focus:outline-2 focus:outline-blue-600"
              />
            </div>

            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-200">
                Last Name
              </label>
              <input
                id="last-name"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="block w-full rounded-md bg-[#18173a] text-white px-4 py-2 text-sm sm:text-base focus:outline-2 focus:outline-blue-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-[#18173a] text-white px-4 py-2 text-sm sm:text-base focus:outline-2 focus:outline-blue-600"
              />
            </div>

            <div className="sm:col-span-2 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                id="password"
                type={visibility ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-[#18173a] text-white px-4 py-3 text-sm sm:text-base focus:outline-2 focus:outline-blue-600"
              />
              <span
                onClick={handleVisible}
                className="absolute right-4 top-9 cursor-pointer text-white text-lg"
              >
                {visibility ? <SlEye /> : <BsEyeSlash />}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 w-full">
            <button
              type="submit"
              className="bg-blue-700 cursor-pointer hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition"
              onClick={handleSignup}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="bg-white text-black hover:bg-gray-100 font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2 transition"
              onClick={googleLogin}
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}
