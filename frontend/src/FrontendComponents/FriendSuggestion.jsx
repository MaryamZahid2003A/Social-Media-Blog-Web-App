import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi'; 
import { useState,useEffect } from 'react';
import useGlobalStore from '../Store/GlobalStore';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function FriendSuggestion() {
  const {user}=useGlobalStore();
  const [query,setQuery]=useState('');
  const [filteredResult,setFilteredResult]=useState([]);
  useEffect(() => {
  if (!user?.email) return;

  const fetchResult = async () => {
    if (query.trim() === '') {
      setFilteredResult([]);
      return;
    }

    try {
      const list = await axios.get(`http://localhost:5000/api/friend/searchFriend?name=${query}`, {
        withCredentials: true
      });

      const filtered = list.data.friends.filter(newUser => newUser.email !== user?.email);
      setFilteredResult(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const delay = setTimeout(fetchResult, 300);
  return () => clearTimeout(delay);
}, [query, user?.email]);

    const sendFriendRequest = async(RequestEmail,firstname,lastname)=>{
        try{
            const res = await axios.post("http://localhost:5000/api/friend/sendRequest",{
                RequestEmail,
                currentEmail : user?.email,
                firstname,
                lastname
            });
            if (res.status===400){
                toast.error(res.data.message);
                return
            }
            console.log(res.data.FriendList);
            toast.success(res.data.message);
        }
        catch(error){
            if (error.response && error.response.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    }
  return (
     <div className="mt-8 flex justify-center ml-8">
            <div className="w-96 rounded overflow-hidden shadow-lg bg-slate-900 text-white p-5 scroll-auto">
                <div className="relative w-full">
                    <input
                    type="text"
                    placeholder="Search Friend..."
                    className="w-full rounded-md bg-slate-600 text-white px-5 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}/>
                    <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-white"
                    >
                    </button>
                <div>
                 {filteredResult.length > 0 && (
                        <ul className="border rounded-sm shadow mt-2">
                        {filteredResult.map(user => (
                            <li
                            key={user._id}
                            className="flex justify-between text-white items-center px-4 py-2 transition-all duration-300 bg-slate-900 hover:bg-slate-800"
                            >
                            <span>{user.firstname} {user.lastname}</span>
                            <button
                                className="text-slate-500 cursor-pointer hover:underline"
                                onClick={()=>sendFriendRequest(user.email,user.firstname,user.lastname)}
                            >
                                Send Request
                            </button>
                            </li>
                        ))}
                        </ul>
                    )}
                    </div>
                </div>
            <div className='flex justify-content-between mt-2'>
                <h1 className= 'text-white p-2 text-md mb-2'>Friend Suggestion</h1>
                <p className='mb-2 p-2 text-white text-md ml-40 '>3</p>
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
