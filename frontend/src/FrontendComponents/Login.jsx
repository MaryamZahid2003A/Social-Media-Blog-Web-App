import React from 'react';
import '../App.css';
import { FcGoogle } from "react-icons/fc";

export default function Login() {
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
                  type="email"
                  autoComplete="email"
                  className="mt-1 w-full rounded-md bg-[#18173a] text-white px-4 py-3 text-base focus:outline focus:outline-2 focus:outline-blue-600"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="mt-1 w-full rounded-md bg-[#18173a] text-white px-4 py-3 text-base focus:outline focus:outline-2 focus:outline-blue-600"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 w-full">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md transition"
              >
                Log In
              </button>
              <button
                type="button"
                className="bg-white hover:bg-red-50 text-black font-medium py-2 px-6 rounded-md transition flex items-center justify-center gap-2"
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
