import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { MdLocationOn } from "react-icons/md";
import { FaEnvelope } from 'react-icons/fa';
import EditProfile from './EditProfile';

export default function FriendCard() {
  return (
     <div className="mt-8 flex justify-center ml-8">
        <div className="w-96 rounded overflow-hidden shadow-lg bg-slate-900 text-white p-5 scroll-auto">
        <div className='flex justify-content-between'>
            <h1 className= 'text-white p-2 text-xl mb-2'>Friend Request</h1>
            <p className='mb-2 p-2 text-white text-xl ml-40 '>3</p>
        </div>
        <div className="">
            <div className="flex items-center justify-between p-2">
                <FaUserCircle size={48} className="text-gray-500" />
                <div className="ml-4">
                <p className="text-lg font-semibold">John Doe</p>
                <p className="text-sm text-gray-400">Web Developer</p>
                </div>
            </div>
        <hr className="mx-auto w-11/12 border-t-2 border-gray-800 p-2" />

             <div className="flex items-center justify-between">
                <FaUserCircle size={48} className="text-gray-500" />
                <div className="ml-4">
                <p className="text-lg font-semibold">John Doe</p>
                <p className="text-sm text-gray-400">Web Developer</p>
                </div>
            </div>
        <hr className="mx-auto w-11/12 border-t-2 border-gray-800 p-2" />

             <div className="flex items-center justify-between">
                <FaUserCircle size={48} className="text-gray-500" />
                <div className="ml-4">
                <p className="text-lg font-semibold">John Doe</p>
                <p className="text-sm text-gray-400">Web Developer</p>
                </div>
            </div>
           
        </div>
        </div>
    </div>
  )
}
