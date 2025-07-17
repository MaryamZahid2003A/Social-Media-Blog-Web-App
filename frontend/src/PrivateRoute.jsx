import React from 'react'
import { useAsyncValue, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import useGlobalStore from "./Store/GlobalStore";
export default function PrivateRoute({children}) {
  const navigate = useNavigate();
  
  const {user}=useGlobalStore();
  if (!user){
    toast.error("Unauthenticated User ! Please Login First");
    return <Navigate to="/login" replace />;
  }
  return children;
}
