import React, { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { CiImageOn, CiVideoOn, CiCircleRemove } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineLike } from "react-icons/ai";

import { toast } from 'react-toastify';
import useGlobalStore from '@/Store/GlobalStore';
import Comments from './Comments';
export default function PostCard() {
  const {user}=useGlobalStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [fetchAllPost,setfetchAllPost]=useState([]);
  useEffect(()=>{
    const fetchPost=async()=>{
      const fetch = await axios.get(`http://localhost:5000/api/post/fetchPost/${user.email}` ,{
        withCredentials:true
      })
      setfetchAllPost(fetch.data.postData);
      console.log("showing All post")
      console.log(fetch.data.postData);
    }
    fetchPost();
  },[])
  

  return (
    <div className='p-3 mt-8 ml-8 w-150 h-auto rounded overflow-hidden shadow-lg bg-slate-900 text-white'>
      
      <div className="mt-3">
            <h2 className="text-xl font-bold pb-6 text-white border-b  border-slate-600 ">
              📝Your Posts
            </h2>

            {fetchAllPost.length === 0 ? (
              <p className="text-gray-400 text-center">No posts available yet.</p>
            ) : (
              <div className="h-[1000px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                {fetchAllPost.map((post, index) => (
                  <div
                    key={index}
                    className="bg-slate-800 scroll-auto  mt-5 rounded-lg p-4 shadow-md hover:shadow-blue-400/30 transition-all duration-300 border border-slate-700"
                  >
                    {/* Post Header */}
                    <div className="flex  mb-3">
                      <div>
                        <FaUserCircle size={50}/>
                      </div>
                      <div>
                        <div className="text-lg text-blue-400 font-semibold truncate w-full ml-2">
                          {post.user.firstname} {post.user.lastname}
                          
                        </div>
                        <p className='ml-2'>{post.user.profession? (
                          <p className='text-white'>{post.user.profession}</p>
                        ) : 
                        (<p>-----------</p>)}</p>
                      </div>

                    </div>

                    <p className="text-gray-300 text-md ml-5">{post.description}</p>

                    {/* Media */}
                    {post.media && post.media.length > 0 && (
                      <div
                      className={`${
                        post.media.length === 1
                          ? 'flex justify-center'
                          : 'flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800'
                      } py-2`}
                    >
                        {post.media.map((mediaItem, i) => {
                          const ext = mediaItem.url.split(".").pop().toLowerCase();
                          const isVideo = ["mp4", "webm", "ogg"].includes(ext);
                          const isImage = ["jpg", "jpeg", "png", "gif"].includes(ext);

                          return (
                            <div
                              key={i}
                              className="min-w-[450px] max-w-[700px] rounded-md overflow-hidden group p-1  flex items-center justify-center"
                            >
                              {isVideo ? (
                                <video
                                  src={mediaItem.url}
                                  controls
                                  className="w-full h-full object-contain rounded"
                                />
                              ) : isImage ? (
                                <img
                                  src={mediaItem.url}
                                  alt="Post Media"
                                  className="w-full h-full object-contain rounded"
                                />
                              ) : (
                                <p className="text-red-400 text-sm p-2">Unsupported media</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div>
                      <Comments postid={post._id}/>
                    </div>
                  </div>
                  
                ))}
               
              </div>
            )}
          </div>


        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-gray-200/70 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center overflow-auto relative">
              {selectedPreview && (
                <>
                  {selectedPreview.type === 'image' || selectedPreview.type === 'gif' ? (
                    <img
                      src={selectedPreview.url}
                      alt="Enlarged Preview"
                      className="max-w-full max-h-full object-contain rounded"
                    />
                  ) : (
                    <video
                      src={selectedPreview.url}
                      controls
                      className="max-w-full max-h-full object-contain rounded"
                    />
                  )}

                
                  <button
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="absolute top-1 right-3 cursor-pointer bg-black/70 hover:bg-slate-950 rounded-full p-2 text-white"
                  >
                    <CiCircleRemove size={30} />
                  </button>
                </>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
    </div>
  );
}
