import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { AiFillHome, AiOutlineUser, AiOutlineUsergroupAdd } from 'react-icons/ai';
import ProfileCard from './ProfileCard';
import PostCard from './PostCard';
import FriendCard from './FriendCard';
import useGlobalStore from '../Store/GlobalStore';
import axios from 'axios';
import { toast } from 'react-toastify';
import YourPost from './YourPost';

export default function BlogPage() {
  const { user, viewPost } = useGlobalStore();
  const [query, setQuery] = useState('');
  const [filteredResult, setFilteredResult] = useState([]);
  const [activeTab, setActiveTab] = useState('home');

  const sendFriendRequest = async (RequestEmail, firstname, lastname) => {
    try {
      const res = await axios.post("http://localhost:5000/api/friend/sendRequest", {
        RequestEmail,
        currentEmail: user?.email,
        firstname,
        lastname
      });

      if (res.status === 400) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (!user?.email) return;

    const fetchResult = async () => {
      if (query.trim() === '') {
        setFilteredResult([]);
        return;
      }

      try {
        const list = await axios.get(
          `http://localhost:5000/api/friend/searchFriend?name=${query}`,
          { withCredentials: true }
        );

        const filtered = list.data.friends.filter(
          (newUser) => newUser.email !== user.email
        );
        setFilteredResult(filtered);
      } catch (error) {
        console.log(error);
      }
    };

    const delay = setTimeout(fetchResult, 300);
    return () => clearTimeout(delay);
  }, [query, user?.email]);

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8 text-white pb-20">
      {/* Search Bar */}
      <form className="flex items-center justify-center max-w-xl mx-auto mb-6">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full rounded-md bg-slate-900 text-white px-5 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e) => e.preventDefault()}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-white"
          >
            <FiSearch size={20} />
          </button>

          {query.trim() !== '' && (
            filteredResult.length > 0 ? (
              <ul className="absolute z-10 w-full bg-slate-800 mt-2 rounded-md shadow">
                {filteredResult.map((user) => (
                  <li
                    key={user._id}
                    className="flex justify-between items-center px-4 py-2 hover:bg-slate-700"
                  >
                    <span>{user.firstname} {user.lastname}</span>
                    <button
                      type="button"
                      onClick={() => sendFriendRequest(user.email, user.firstname, user.lastname)}
                      className="text-blue-400 cursor-pointer hover:underline"
                    >
                      Send Request
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-300 mt-2">No Matching User Found!</p>
            )
          )}
        </div>
      </form>

        <div className="hidden lg:flex gap-4">
          <div className="w-2/3">
            <ProfileCard />
          </div>
          <div className="w-2/4">
            {!viewPost ? <PostCard /> : <YourPost />}
          </div>
          <div className="w-2/3">
            <FriendCard />
          </div>
        </div>

        <div className="lg:hidden mt-4">
          {activeTab === 'home' && (!viewPost ? <PostCard /> : <YourPost />)}
          {activeTab === 'profile' && <ProfileCard />}
          {activeTab === 'friends' && <FriendCard />}
        </div>


      <div className="fixed bottom-0 left-0 w-full bg-slate-900 text-white flex justify-around items-center py-3 border-t border-slate-700 lg:hidden">
        <button
                className={`flex flex-col items-center ${activeTab === 'home' ? 'text-blue-500' : ''}`}
                onClick={() => setActiveTab('home')}
              >
                <AiFillHome size={24} />
                <span className="text-xs">Home</span>
              </button>

              <button
                className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-blue-500' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <AiOutlineUser size={24} />
                <span className="text-xs">Profile</span>
              </button>

              <button
                className={`flex flex-col items-center ${activeTab === 'friends' ? 'text-blue-500' : ''}`}
                onClick={() => setActiveTab('friends')}
              >
                <AiOutlineUsergroupAdd size={24} />
                <span className="text-xs">Friends</span>
              </button>

      </div>
    </div>
  );
}
