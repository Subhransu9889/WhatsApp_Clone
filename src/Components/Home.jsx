import React from 'react'
import { signOut } from 'firebase/auth'
import { auth, storage } from '../../firebase'
import { LogOut } from 'lucide-react';
import { ref, uploadBytesResumable } from 'firebase/storage';
import ChatPanels from './ChatPanels';
import Chats from './Chats';
import '../Screen_Style/Home.css'

function Home({ setisLogedin }) {
  // const setIsLoggedIn = props.setIsLoggedIn;

  // function handleInputFile(e) {
  //   const img = (e.target.files[0]);

  //   //address
  //   const storageRef = ref(storage, "/profile" + Math.random());

  //   //storageTask
  //   const uploadTask = uploadBytesResumable(storageRef, img);
  //   console.log(uploadTask);

  //   //devloper
  //   uploadTask.on("state_changed", ProgressCB, ErrorCB, FinalCB);

  //   //upload
  //   function ProgressCB(data){
  //     console.log(data);
  //   }
  //   //on error
  //   function ErrorCB(err){
  //     console.log(err);
  //   }
  //   //final finshed
  //   function FinalCB(){
  //     console.log("successfully updated");
  //   }

  // }
  return (
    <main className='w-full h-screen flex justify-center items-center'>
      <div className='flex w-[98%] h-[98%] bg-gray-300 rounded-md'>
        <div className='h-full w-2/5'>
          <ChatPanels setisLogedin={setisLogedin}></ChatPanels>
        </div>

        {/* <div>
        <input type="file"
        accept='image/png image/jpeg image/href image/webp'
        onChange={handleInputFile} />
      </div> */}


      {/* rightside info */}
        <Chats></Chats>
      </div>

    </main>
  )
}

export default Home