import React from 'react';
import { FiEdit } from 'react-icons/fi'; // Feather Edit icon
import { FaUserCircle } from 'react-icons/fa';
import { MdLocationOn } from "react-icons/md";
import { FaEnvelope } from 'react-icons/fa';
import EditProfile from './EditProfile';

export default function ProfileCard() {
  return (
    <div className="mt-8 flex justify-center">
      <div className="w-96 rounded overflow-hidden shadow-lg bg-slate-900 text-white">
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaUserCircle size={48} className="text-gray-500" />
              <div className="ml-4">
                <p className="text-lg font-semibold">John Doe</p>
                <p className="text-sm text-gray-400">Web Developer</p>
              </div>
            </div>
            <button className="text-blue-400 cursor-pointer hover:text-blue-600 transition">
              <EditProfile/>
            </button>
          </div>
        </div>
        <hr className="mx-auto w-11/12 border-t-2 border-gray-800" />
        <div className="px-6 py-4 space-y-2">
          <div className="flex items-center gap-2 text-gray-400">
            <MdLocationOn className="text-xl" />
            <span>Lahore, Pakistan</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FaEnvelope className="text-xl" />
            <span>maryam@example.com</span>
          </div>
        </div>
        <hr className="mx-auto w-11/12 border-t-2 border-gray-800" />

        <div className="px-6 py-4 space-y-2">
          <div className="flex items-center gap-2 text-gray-400">
           
            <span>Friends</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            
            <span>Who Viewed Your Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}
