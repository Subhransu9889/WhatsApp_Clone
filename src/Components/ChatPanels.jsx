import { collection, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { Loader2Icon, Menu, Sun } from 'lucide-react';
import { CircleFadingPlus } from 'lucide-react';
import { MessageSquare } from 'lucide-react';
import { UserRound } from 'lucide-react';
import Profile from './Profile';
import { useAuth } from './AuthContext';
import Usercards from './Usercards';
import { Moon } from 'lucide-react';
import '../Screen_Style/ChatPanel.css'
// import '../Screen_Style/ChatPanel.css'

function ChatPanels(props) {

    const setisLogedin = props.setisLogedin;
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [showProfile, setshowProfile] = useState(false);
    const { userData } = useAuth();
    const [searchInput, setSearchInput] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    let filteredUser = users;
    if(searchInput){
        //filter the chats based on query
        filteredUser = users.filter((users) => {
            return users.userData.name?.toLowerCase()?.includes(searchInput?.toLowerCase());
        })
    }

    useEffect(() => {
        const getUser = async () => {
            const userCollection = collection(db, "Users");
            const data = await getDocs(userCollection);
            // console.log(data.docs.length);
            const arrayOfUsers = data.docs.map((docs) => { return {userData:docs.data(), userId:docs.id}});
            // console.log(arrayOfUsers);
            setUsers(arrayOfUsers);
            setLoading(false);
        }
        getUser();
    }, []);


    const [isPhoto, setPhoto] = useState(localStorage.getItem('photo') || '');
    useEffect(() => {
        if (userData?.photo) {
            localStorage.setItem('photo', userData.photo);
            setPhoto(userData.photo);
        }
    }, [userData]);


    if(showProfile==true){
        return <Profile setshowProfile={setshowProfile} setisLogedin={setisLogedin} isPhoto={isPhoto}></Profile>
    }

    const userRoundBtnHandler = () => {
        alert("You are Logged In!")
    }

    const screenModeHandler = () => {
        alert("📢 This feature is coming soon! Stay tuned! 🚀");
    }

    const fadingFeatureHandler = () => {
        alert("📢 This feature is coming soon! Stay tuned! 🚀");
    }

    const messageFeatureHandler = () => {
        alert("📢 This feature is coming soon! Stay tuned! 🚀");
    }

  return (
    <div className="h-full flex flex-col bg-[#eff2f5] border border-gray-300 rounded-lg shadow-sm">
            {/* Top Section */}
            <div className="flex items-center justify-between p-2 bg-[#eff2f5] border-b border-gray-300">
                {/* Profile Picture */}
                <button onClick={() => setshowProfile(true)} className="flex-shrink-0">
                    <img src={isPhoto} alt="Profile" className="h-12 w-12 rounded-full object-cover"/>
                </button>

                {/* Desktop Icons - Visible on Medium Screens and Above */}
                <div className="hidden md:flex gap-4 items-center">
                    <Sun onClick={screenModeHandler}/>
                    <CircleFadingPlus onClick={fadingFeatureHandler}/>
                    <MessageSquare onClick={messageFeatureHandler}/>
                    <UserRound onClick={userRoundBtnHandler} />
                </div>

                {/* Hamburger Menu - Visible on Small Screens */}
                <button 
                    className="md:hidden p-2 focus:outline-none" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu size={28} />
                </button>
            </div>

            {/* Mobile Menu - Shows when isMenuOpen is true */}
            {isMenuOpen && (
                <div className="flex flex-col items-center gap-3 p-3 md:hidden bg-white shadow-md border border-gray-300">
                    <Sun onClick={screenModeHandler}/>
                    <CircleFadingPlus onClick={fadingFeatureHandler}/>
                    <MessageSquare onClick={messageFeatureHandler}/>
                    <UserRound onClick={userRoundBtnHandler} />
                </div>
            )}
        { isLoading ? <div className="h-full w-full flex justify-center items-center"><Loader2Icon className='w-12 h-12 animate-spin'/></div> :  <div className='flex-1 overflow-y-auto border border-gray-300 bg-white rounded-lg shadow-md'>
                <div className='p-2'>
                    <input type='text' 
                    placeholder=' 🔍 Search or start new chats' 
                    className='w-full p-2 border border-gray-300 rounded-2xl placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-300 shadow-sm'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    ></input>
                </div>
                <div>
                {filteredUser.map((userObject) => (
                    <Usercards userData={userData} userObject={userObject}></Usercards>
                ))}
                </div>
        </div>}
    </div>
  )
}

export default ChatPanels