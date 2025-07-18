import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { MdLocationOn } from "react-icons/md";
import { FaEnvelope } from 'react-icons/fa';
import EditProfile from './EditProfile';
import useGlobalStore from '../Store/GlobalStore';
import axios from 'axios'; 
import { IoHomeOutline } from "react-icons/io5";


export default function ProfileCard() {

  const { user,fetchUser,setPost } = useGlobalStore();
  const [friendlist, setFriendList] = useState([]);
 useEffect(() => {
      fetchUser();
  }, []);

  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/friend/recievedRequest/${user.email}`, {
          withCredentials: true
        });
        const list = Array.isArray(res.data.filteredlist) ? res.data.filteredlist : [];
        const detailedList = await Promise.all(
          list.map(async(req)=>{
              try{
                  if (!user || !user.email) return;
                      const userRes = await axios.get(`http://localhost:5000/api/user/fetchUser/${req.email}`, {
                        withCredentials: true,
                  });
                  return {
                  ...req,
                      senderInfo: userRes.data.user, 
                  };
              }
              catch(error){
                console.error("Failed to fetch user for", req.email, error);
              return req; 
              }
          })
        )
        setFriendList(detailedList);  
      } catch (error) {
        console.error("Failed to fetch friend requests:", error);
      }
    };

    if (user?.email) {
      fetchFriendList();
    }
  }, [user?.email]);
  useEffect(() => {
  console.log("Updated friendlist:", friendlist);
}, [friendlist]);

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
                <p className="text-lg font-semibold">{user?.firstname || 'Firstname'} {user?.lastname || 'Lastname'}</p>
                <p className="text-sm text-gray-400">{user?.profession || 'No Profession Added'}</p>
              </div>
            </div>
            <EditProfile />
          </div>
        </div>

        <hr className="mx-auto w-11/12 border-t-2 border-gray-800" />

        <div className="px-6 py-4 space-y-2">
          <div className='flex'>
            <button className='cursor-pointer ' onClick={()=>setPost(false)}>
            <IoHomeOutline size={20} className='text-blue-400' />  
            </button>
            <button className='text-sm cursor-pointer text-blue-400 font-semibold ml-2 '  onClick={()=>setPost(true)}>
             | Your Posts 
            </button>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <MdLocationOn className="text-xl" />
            <span>{user?.location || 'Not Added Yet!'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FaEnvelope className="text-xl" />
            <span>{user.email}</span>
          </div>
         
        </div>

        <hr className="mx-auto w-11/12 border-t-2 border-gray-800" />

        <div className="px-6 py-4">
          <div className='flex justify-between'>
            <p className="text-white font-semibold mb-2">Followers:</p>
            <p className="text-white font-semibold mb-2">{friendlist.length}</p>
          </div>
          {friendlist.length === 0 ? (
            <p className="text-gray-500">No Followers !</p>
          ) : (
           <ul className="space-y-1 text-sm max-h-40 overflow-y-auto pr-2">
        {friendlist.map((req, index) => (
          <li key={index} className="text-gray-300 text-md mt-2">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FaUserCircle size={26} className="text-gray-500" />
                    <div>
                    <p className="text-white font-semibold">
                        {req.senderInfo?.firstname || 'Unknown'} {req.senderInfo?.lastname || ''}
                    </p>
                    <p className="text-gray-400 text-sm">{req.senderInfo?.profession || 'No Profession Added Yet'}</p>
                    </div>
                </div>
              </div>
          </li>
        ))}
      </ul>
          )}
        </div>
      </div>
    </div>
  );
}
