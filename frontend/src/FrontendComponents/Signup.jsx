import React from 'react';
import '../App.css'; 
import { FcGoogle } from "react-icons/fc";

export default function Login() {


  const googleLogin=()=>{
    window.location.href='http://localhost:5000/auth/google'
  }
  return (
    <div className=" login flex justify-center min-h-screen mt-3">
      

      <div className=" flex flex-col justify-center items-center text-white p-10 pt-2 w-1/2">
        <h2 className="text-3xl font-semibold mb-6">SignUp to BlogSpace</h2>

        <form className="">
          <div className="pb-6 border-b border-gray-700">
            <p className="mt-1 text-sm text-gray-400">Use your registered credentials to log in.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-200">
                First Name
              </label>
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-[#18173a] text-white px-4 py-3 text-base  focus:outline-2 focus:outline-blue-600"
              />
            </div>

            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-200">
                Last Name
              </label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md bg-[#18173a] text-white px-4 py-3 text-base focus:outline focus:outline-2 focus:outline-blue-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-[#18173a] text-white px-4 py-3 text-base focus:outline focus:outline-2 focus:outline-blue-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md bg-[#18173a] text-white px-4 py-3 text-base focus:outline focus:outline-2 focus:outline-blue-600"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 w-full">
            <button
                type="submit"
                className="bg-blue-700 cursor-pointer hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md transition"
            >
                Signup
            </button>
           <button
                type="button"
                className="bg-white  hover:bg-red-50 cursor-pointer text-black font-medium py-2 px-6 rounded-md transition flex items-center justify-center gap-2"
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
