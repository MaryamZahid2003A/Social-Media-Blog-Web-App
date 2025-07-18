import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
export default function Comments({postid}) {
    const [comments,setComments]=useState([]);
    useEffect(()=>{
        const fetchPost = async()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/post/AllComment/${postid}`,{
                    withCredentials:true
                })
                console.log("showing comments on fetch");
                console.log(res.data.comments);
                setComments(res.data.comments)
            }
            catch(error){
                console.log(error);
            }
        }
        fetchPost();
    },[postid])
  return (
    <div className='h-[120px] mt-10 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800'>
        <h3 className="text-md font-semibold text-white mb-3">💬 Comments</h3>
        {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
        ) : (
            <ul className="space-y-2 max-h-60 overflow-y-auto">
            {comments.map((cmt, idx) => (
                <li key={idx} className="bg-slate-700 p-2 rounded text-sm text-gray-200 mt-2">
                <span className="font-semibold text-blue-400">
                    {cmt.user.firstname} {cmt.user.lastname}:
                </span>{" "}
                {cmt.text}
                </li>
            ))}
            </ul>
        )}
    </div>
  )
}
