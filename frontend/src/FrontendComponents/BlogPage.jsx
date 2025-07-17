import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi'; 
import ProfileCard from './ProfileCard';
import PostCard from './PostCard';
import FriendCard from './FriendCard';
import FriendSuggestion from './FriendSuggestion';

export default function BlogPage() {
  

  return (
    <div className="min-h-screen  p-8 text-white">
      <form
        className="flex items-center justify-center max-w-xl mx-auto"
      >
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full rounded-md bg-slate-900 text-white px-5 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-white"
          >
            <FiSearch size={20} />
          </button>
        </div>
      </form>
      <div className='flex justify-content-center'>
        <div className=''>
            <ProfileCard/>
        </div>
        <div>
            <PostCard/>
        </div>
        <div className=' flex-row'> 
          <div>
              <FriendCard/>
          </div>
          <div>
            <FriendSuggestion/>
          </div>
        </div>
      </div>
    </div>
  );
}
