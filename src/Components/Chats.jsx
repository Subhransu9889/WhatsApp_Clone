import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { MessageSquareText } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Send } from 'lucide-react';
import { Timestamp, arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from './AuthContext';
import '../Screen_Style/Chats.css'

function Chats() {
  const params = useParams();
  const [msg, setMsg] = useState("");
  const [secondUser, setSecondUser] = useState();
  const reciverId = params.chatId;
  const {userData} = useAuth();
  const [msgList, setMsgList] = useState([]);

  const idChat = userData?.id > reciverId
  ? `${userData?.id}-${reciverId}`
  :  `${reciverId}-${userData?.id}`;

  const plustHandler = () => {
    alert("📢 This feature is coming soon! Stay tuned! 🚀");
  }


  const handleSendbtn = async () => {
    if(msg){
      
      const date = new Date();
      const timeStamp = date.toLocaleDateString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      //start message 
     if(msgList?.length === 0){
      await setDoc(doc(db, "user-chats", idChat), {
        chatId: idChat,
        message:[
          {
            text: msg,
            time: timeStamp,
            sender: userData.id,
            reciver: reciverId,
          }
        ]
      });
     }
     else{
      //update the list 
      await updateDoc(doc(db, "user-chats", idChat), {
        chatId: idChat,
        //arrayunion is used here to append the list message to array list
        message: arrayUnion(
          {
            text: msg,
            time: timeStamp,
            sender: userData.id,
            reciver: reciverId,
          }
        )
      });
     }
      setMsg("");
    }
  }

  useEffect(() => {
    // request and data fetch
    const getUser = async () => {
      const docRef = doc(db, 'Users', reciverId);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        setSecondUser(docSnap.data());
      }
    };
    getUser();

    const msgUnsubscribe = onSnapshot(doc(db, "user-chats", idChat), (doc) => {
      setMsgList(doc.data()?.message || []);
    });

    return () => {
      msgUnsubscribe();
    }
  }, [reciverId])

  if(!reciverId)
  //Empty Screen
  return (
    <div className='flex justify-center items-center w-full flex-col'>
      <MessageSquareText className='h-20 w-20 text-gray-400'/>

      <p className='text-sm text-center text-gray-400'>
        select any contact to
      <br />
        start a chat with.
      </p>
    </div>
  )

    return<div className='flex justify-center items-center w-full flex-col'>
      <div className='w-full h-full bg-[#F2EFE9] flex flex-col'>
        {/* top bar */}

        <div className='bg-[#eff2f5] px-4 py-[11px] flex items-center gap-3 shadow-sm border-b-1 border-[#eff2f5]'>
          <img src={secondUser?.profile_pic || "Whatsapp_clone/public/istockphoto-1223671392-612x612.jpg"} 
          alt="Profile_pic" 
          className='h-12 w-12 rounded-full object-cover'
          />
         <div>
          <h3>{secondUser?.name}</h3>
          <h3>{secondUser?.lastseen && (
            <p className='text-xs text-neutral-400'>
              Last seen at {secondUser?.lastseen}
            </p>
          )}</h3>
         </div>
        </div>

        {/* message/ chat section  */}
        <div className='flex flex-grow flex-col gap-2 p-4 overflow-y-scroll'>
          {msgList?.map((m, index) => (
            <div key={index}
            data-sender = {m.sender === userData.id}
            /* break-word is the edge case where a single word is quite long, so we need to break that word before it break our ui*/
            className={`w-fit max-w-[400px] p-3 rounded-lg shadow-md break-words
            ${m.sender === userData.id ? "ml-auto bg-blue-500 text-white" : "bg-gray-300 text-black"}
          `}
            >
              <p>{m?.text}</p>
              <p className='className="text-xs text-gray-100 text-right mt-1 opacity-75"'>{m?.time}</p>
          
            </div>
          ))}
        </div>

        {/* buttom bar */}
        <div className='bg-[#eff2f5] flex items-center py-3 px-6 shadow gap-6'>
          <Plus onClick={plustHandler} className='cursor-pointer'/>
          <input type="text" placeholder='Type a message...' className='w-full px-4 py-2 rounded bg-white focus:outline-none'
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          onKeyDown={(e) => {
            if(e.key === "Enter"){
              handleSendbtn();
            }
          }}
          />
          <button onClick={handleSendbtn}>
            <Send/>
          </button>
        </div>
      </div>
    </div>
}

export default Chats