import React, { useState ,useEffect} from 'react';
import { FiEdit } from 'react-icons/fi';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useGlobalStore from '../Store/GlobalStore';


export default function EditProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const {user,fetchUser,setUser} = useGlobalStore();
  const [firstname,setFirstname]=useState('');
  const [lastname,setLastname]=useState('');
  const [profession,setProfession]=useState('');
  const [location,setLocation]=useState('');
  const [email,setEmail]=useState('');

 
const handleDialogopen = async (e) => {
  e.preventDefault();
  try {
    if (!user || !user.email) return;
    const res = await axios.get(`http://localhost:5000/api/user/fetchUser/${user.email}`, {
      withCredentials: true,
    });
    const fetchedUser = res.data.user;
    setEmail(user.email);
    setUser(fetchedUser);
    setFirstname(fetchedUser.firstname);
    setLastname(fetchedUser.lastname);
    setProfession(fetchedUser.profession);
    setLocation(fetchedUser.location);
  
    setIsOpen(true);
  } catch (error) {
    console.log(error);
  }
};
const handleEdit=async(e)=>{
  e.preventDefault();
  console.log("edit option")
  console.log(profession);
  console.log(location);
  try{
    if (!firstname || !lastname){
      toast.error("Profile Must Contain First and Last Name")
    }
    else {
      const res = await axios.post("http://localhost:5000/api/user/editProfile",{
      email,
      firstname,
      lastname,
      profession,
      location
    },{
      withCredentials:true
    })
    toast.success("Updated Successfully !")
    
    await fetchUser();
    setUser({firstname,lastname,profession,location})
    console.log("User after update:", user); 
    setIsOpen(false);
    }
  }
  catch(error){
    console.log(error);
    toast.error("Error In Updating Profile!")

  }
}
  return (
    <div className="flex justify-center">
      <div
        onClick={handleDialogopen}
        className="rounded-md px-3 py-2 text-md font-semibold text-blue-700 transition cursor-pointer"
      >
        <FiEdit size={20} />
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-gray-300/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-lg bg-slate-900 p-6 shadow-lg">
            <h2 className="text-lg font-bold text-white">Edit Profile</h2>
            <form className="mt-4 bg-slate-900">
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-200">
                    First Name
                  </label>
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    value={firstname}
                    onChange={(e)=>setFirstname(e.target.value)}
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-[#18173a] text-white px-4 py-3 text-base focus:outline-2 focus:outline-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-200">
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    value={lastname}
                    onChange={(e)=>setLastname(e.target.value)}
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-[#18173a] text-white px-4 py-3 text-base focus:outline-2 focus:outline-blue-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="profession" className="block text-sm font-medium text-gray-200">
                    Profession
                  </label>
                  <input
                    id="email"
                    name="profession"
                    type="text"
                    value={profession}
                    onChange={(e)=>setProfession(e.target.value)}
                    autoComplete="email"
                    className="block w-full rounded-md bg-[#18173a] text-white px-4 py-3 text-base focus:outline-2 focus:outline-blue-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                    Location
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="text"
                    value={location}
                    onChange={(e)=>setLocation(e.target.value)}
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-[#18173a] text-white px-4 py-3 text-base focus:outline-2 focus:outline-blue-600"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded cursor-pointer hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded hover:bg-blue-800"
                  onClick={handleEdit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
