import React, { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { CiImageOn, CiVideoOn, CiCircleRemove } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';

import { toast } from 'react-toastify';
import useGlobalStore from '@/Store/GlobalStore';
export default function PostCard() {
  const {user}=useGlobalStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const gifInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [fetchAllPost,setfetchAllPost]=useState([]);

const handlePost = async () => {
  const formData = new FormData();
  formData.append('email',user.email);
  formData.append('description', description);
  selectedFiles.forEach(({ file }) => {
    formData.append('media', file);
  });
  

  try {
    const response = await axios.post('http://localhost:5000/api/post/createPost', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status===400){
      toast.error(response.data.error)
    }
    toast.success(response.data.message); 
    console.log('Upload successful:', response.data);
    setSelectedFiles([]);
    setDescription('');
  } catch (error) {
    
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error); 
    } else {
      toast.error('Upload failed. Try again.');
    }
    console.error('Upload error:', error);
  }
};


  const handleIconClick = (ref) => {
    if (ref.current) ref.current.click();
  };

  const handleFileChange = (e, type) => {
  const files = Array.from(e.target.files);
  const MAX_IMAGE_SIZE_MB = 5;   // example: 5MB
  const MAX_VIDEO_SIZE_MB = 50;  // example: 50MB
  const MAX_GIF_SIZE_MB = 10;    // example: 10MB

  const filteredFiles = files.filter(file => {
    const fileSizeMB = file.size / (1024 * 1024); // Convert to MB

    if (type === 'video' && fileSizeMB > MAX_VIDEO_SIZE_MB) {
      toast.error(`Video "${file.name}" exceeds ${MAX_VIDEO_SIZE_MB}MB limit.`);
      return false;
    }

    if (type === 'image' && fileSizeMB > MAX_IMAGE_SIZE_MB) {
      toast.error(`Image "${file.name}" exceeds ${MAX_IMAGE_SIZE_MB}MB limit.`);
      return false;
    }

    if (type === 'gif' && fileSizeMB > MAX_GIF_SIZE_MB) {
      toast.error(`GIF "${file.name}" exceeds ${MAX_GIF_SIZE_MB}MB limit.`);
      return false;
    }

    return true; // ✅ keep the file
  });

  const newFiles = filteredFiles.map(file => ({
    file,
    url: URL.createObjectURL(file),
    type,
  }));

  setSelectedFiles(prev => [...prev, ...newFiles]);
  e.target.value=null;
};


  const handleRemove = (indexToRemove) => {
    setSelectedFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleEnlarge = (media) => {
    setSelectedPreview(media);
    setIsOpen(true);
  };

  useEffect(()=>{

    const fetchPost=async()=>{
      const fetch = await axios.get("http://localhost:5000/api/post/fetchAllPost" ,{
        withCredentials:true
      })
      setfetchAllPost(fetch.data.fetchPost);
      console.log("showing All post")
      console.log(fetch.data.fetchPost);
    }
    fetchPost();
  },[])
  

  return (
    <div className='p-3 mt-8 ml-8 w-150 h-auto rounded overflow-hidden shadow-lg bg-slate-900 text-white'>
      <div className="relative w-full border-2 border-slate-700 rounded-md">
        <input
            type="text"
            placeholder="What's in your mind ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md bg-slate-900 text-white px-5 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

        
      </div>

      <div className="flex justify-evenly gap-4 text-white mt-4">
        <span className="text-md mt-2">Upload</span>

        <div className="flex flex-col items-center cursor-pointer mt-2" onClick={() => handleIconClick(imageInputRef)}>
          <CiImageOn size={24} />
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            ref={imageInputRef}
            multiple
            onChange={(e) => handleFileChange(e, 'image')}
            style={{ display: 'none' }}
          />
        </div>

        <div className="flex flex-col items-center cursor-pointer ml-10 mt-2" onClick={() => handleIconClick(videoInputRef)}>
          <CiVideoOn size={24} />
          <input
            type="file"
            accept="video/mp4, video/webm, video/ogg"
            ref={videoInputRef}
            multiple
            onChange={(e) => handleFileChange(e, 'video')}
            style={{ display: 'none' }}
          />
        </div>

        <div className="flex flex-col items-center cursor-pointer ml-10 mt-2" onClick={() => handleIconClick(gifInputRef)}>
          <MdOutlineGifBox size={24} />
          <input
            type="file"
            accept="image/gif"
            ref={gifInputRef}
            multiple
            onChange={(e) => handleFileChange(e, 'gif')}
            style={{ display: 'none' }}
          />
        </div>

        <button
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-sm px-6 py-2 rounded"
            onClick={handlePost}
          >
            Post
          </button>

      </div>

      {/* PREVIEW */}
      <div className="mt-6 overflow-x-auto">
        <div className={`flex gap-4 ${selectedFiles.length === 1 ? 'justify-center' : ''}`}>
          {selectedFiles.map((media, index) => (
            <div
              key={index}
              className="relative cursor-pointer rounded overflow-hidden p-2 bg-slate-800 min-w-[300px] min-h-[300px] max-w-[400px] max-h-[400px] flex justify-center items-center"
              onClick={() => handleEnlarge(media)}
            >
              {media.type === 'image' || media.type === 'gif' ? (
                <img src={media.url} alt="Preview" className="object-contain max-w-full max-h-full" />
              ) : (
                <video src={media.url} controls className="object-contain max-w-full max-h-full" />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleRemove(index);
                }}
                className="absolute top-1 right-1 bg-black/70 hover:bg-slate-950 rounded-full p-1 text-white"
              >
                <CiCircleRemove size={22} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
            <h2 className="text-xl font-bold mb-6 text-white border-b border-slate-600 pb-2">
              📝Posts
            </h2>

            {fetchAllPost.length === 0 ? (
              <p className="text-gray-400 text-center">No posts available yet.</p>
            ) : (
              <div className="">
                {fetchAllPost.map((post, index) => (
                  <div
                    key={index}
                    className="bg-slate-800  mt-5 rounded-lg p-4 shadow-md hover:shadow-blue-400/30 transition-all duration-300 border border-slate-700"
                  >
                    {/* Post Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <FaUserCircle size={40}/>
                      </div>
                      <div className="text-lg text-blue-400 font-semibold truncate w-full ml-5">
                        {post.user.firstname} {post.user.lastname}   {post.user.profession}
                      </div>
                    </div>

                    <p className="text-gray-300 mb-2 text-md ml-5">{post.description}</p>

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
                              className="min-w-[400px] max-w-[660px] h-[350px] rounded-md overflow-hidden group hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center"
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
