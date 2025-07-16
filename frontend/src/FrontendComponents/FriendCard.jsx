import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import useGlobalStore from '../Store/GlobalStore';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function FriendCard() {
  const { user } = useGlobalStore();
  const [friendlist, setFriendList] = useState([]);

  const fetchFriendList = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/friend/pendingRequest/${user.email}`, {
        withCredentials: true,
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
      console.error('Failed to fetch friend requests:', error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchFriendList();
    }
  }, [user?.email]);

  // Accept friend request
  const handleAccept = async (Email) => {
    try {
      await axios.post(
        `http://localhost:5000/api/friend/acceptRequest/${user.email}`,
        {recieverEmail: Email},
        { withCredentials: true }
      );
      toast.success('Friend request accepted!');
      fetchFriendList(); 
    } catch (error) {
      console.error(error);
      toast.error('Failed to accept request');
    }
  };

  // Deny friend request
  const handleDeny = async (Email) => {
    try {
      await axios.post(
        `http://localhost:5000/api/friend/denyRequest/${user.email}`,
        { receiverEmail: Email},
        { withCredentials: true }
      );
      toast.success('Friend request denied.');
      fetchFriendList(); 
    } catch (error) {
      console.error(error);
      toast.error('Failed to deny request');
    }
  };

  return (
    <div className="mt-8 flex justify-center ml-8">
      <div className="w-96 rounded overflow-hidden shadow-lg bg-slate-900 text-white p-5">
        <div className="px-2 py-1">
          <div className="flex justify-between">
            <p className="text-white font-semibold mb-2">Friend Requests:</p>
            <p className="text-white font-semibold mb-2">{friendlist.length}</p>
          </div>
          {friendlist.length === 0 ? (
            <p className="text-gray-500">No friend requests received.</p>
          ) : (
            <ul className="space-y-2 text-sm max-h-40 overflow-y-auto pr-2">
              {friendlist.map((req, index) => (
                <li key={index} className="text-gray-300 text-md mt-4">
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
                    <div className="flex gap-2 ml-4">
                        <button
                        onClick={() => handleAccept(req.email)}
                        className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-sm px-2 py-1 rounded"
                        >
                        Accept
                        </button>
                        <button
                        onClick={() => handleDeny(req.email)}
                        className="bg-gray-600 cursor-pointer hover:bg-gray-700 text-white text-sm px-2 py-1 rounded"
                        >
                        Deny
                        </button>
                    </div>
                    </div>
                     <hr className="mx-auto w-11/12  mt-2 border-t-2 border-gray-800" />
                </li>
                ))}

            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
