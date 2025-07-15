import React from 'react';
import { FiEdit } from 'react-icons/fi'; 
import { FaUserCircle } from 'react-icons/fa';
import { MdLocationOn } from "react-icons/md";
import { FaEnvelope } from 'react-icons/fa';
import EditProfile from './EditProfile';
import useGlobalStore from '../Store/GlobalStore';

export default function ProfileCard() {
  const { user } = useGlobalStore();

  if (!user) {
    return (
      <div className="text-white mt-4 text-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="mt-8 flex justify-center">
      <div className="w-96 rounded overflow-hidden shadow-lg bg-slate-900 text-white">
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaUserCircle size={48} className="text-gray-500" />
              <div className="ml-4">
                <p className="text-lg font-semibold">{user.firstname} {user.lastname}</p>
                <p className="text-sm text-gray-400">{user.profession}</p>
              </div>
            </div>
            <EditProfile />
          </div>
        </div>
        <hr className="mx-auto w-11/12 border-t-2 border-gray-800" />
        <div className="px-6 py-4 space-y-2">
          <div className="flex items-center gap-2 text-gray-400">
            <MdLocationOn className="text-xl" />
            {user.location ? <span>{user.location}</span> : <span>Not Added Yet!</span>}
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FaEnvelope className="text-xl" />
            <span>{user.email}</span>
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
