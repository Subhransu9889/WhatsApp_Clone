import React from 'react'
import { ArrowLeft } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { useAuth } from './AuthContext';
import { LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import '../Screen_Style/Profile.css';

function Profile({setshowProfile , setisLogedin, isPhoto}) {
    const [isHovered, setIsHovered] = useState(false);
    const { userData, UpdateStatus } = useAuth();
    console.log(userData);
    // const [name, setName] = useState(userData?.name || "");
    const [status, SetStatus] = useState(userData?.status || "");

    const editProfile = () => {
        alert("profile updated");
    }

    const logoutHandler = async () => {
        if (typeof setisLogedin !== "function") {
          console.error("setisLogedin is not a function:", setisLogedin);
          return;
        }
      
        await signOut(auth);
        setisLogedin(false);
        alert("Are you sure to logout");
      };

  return (
    <div className='h-full flex flex-col bg-gray-200'>
        <div>
            {/* Top Section: Back Arrow & Profile Title */}
        <div className='flex items-center p-4 bg-gray-300 text-2xl border-r m-1'>
            <ArrowLeft className='h-8 w-8 cursor-pointer' onClick={() => setshowProfile(false)}/>
            <div className='flex-1 text-center font-semibold'>Profile</div>
        </div>

        {/* Scrollable Profile Content */}
        <div className="flex-1 overflow-y-auto p-4">
            <div className="flex justify-center items-center my-6">
            <div 
                    className="relative w-50 h-50 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Profile Image */}
                    <img
                        src={isPhoto}
                        alt="Profile"
                        className={`h-full w-full object-cover transition-all duration-500 ${isHovered ? "blur-xs brightness-75" : ""}`}
                    />

                    {/* Pencil Icon (Appears in the Center on Hover) */}
                    {isHovered && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-3 rounded-full shadow-lg m-1" onClick={editProfile}>
                            <Pencil className='h-8 w-8 text-black'/>
                            <div>Edit</div>
                        </div>
                    )}
                </div>
            </div>

            {/* User Info Section */}
            <div className='bg-white p-4 rounded-lg shadow-sm mb-4 flex items-center'>
                <div className='flex-1'>
                <h5 className='text-gray-500'>Your Name</h5>
                <h5 className='text-lg font-semibold'>{userData?.name || ".........."}</h5>
                </div>
                <div>
                    <Check className='text-green-400'/>
                </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-sm mb-4 flex flex-col sm:flex-row items-start sm:items-center w-full'>
                <div className='flex-1'>
                <h5 className='text-gray-500'>Your Status</h5>
                <input 
                    type='text' 
                    value={status} 
                    className='text-md font-semibold focus:outline-none w-full sm:w-auto text-wrap break-words' 
                    placeholder='Add your status' 
                    onChange={(e) => SetStatus(e.target.value)}
                />
                </div>
                <button onClick={() => UpdateStatus(status)}>
                    <Check className='text-green-400'/>
                </button>
            </div>

            {/* Logout Button */}
        <div className=' flex justify-center'>
            <div className='flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300 cursor-pointer' onClick={logoutHandler}>
                <button className='cursor-pointer'>Logout</button>
                <LogOut className="h-5 w-5"/>
            </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Profile