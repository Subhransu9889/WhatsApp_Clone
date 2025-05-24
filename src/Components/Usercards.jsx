import React from 'react'
import { Link, useParams } from 'react-router-dom'

function Usercards(props) {
    const {userObject} = props;
    const param = useParams();
    // console.log(param.chatId);
    // console.log(userObject);
    // const isActive = param?.chatid === userObject.id;
  return (
    <Link key={userObject.userId} className='flex gap-2 m-2 border-b-1 p-2 hover:bg-gray-200' to={`/${userObject.userId}`}> {/* ✅ Corrected key reference */}
        {/* <p>userId: {userObject.userId}</p> */}
        {/* {console.log("Image Source:", userObject.userData.profile_pic)} */}
        <img src={userObject.userData.profile_pic} alt="User Profile" referrerPolicy="no-referrer" className='h-12 w-12 rounded-4xl'/>
        <div className='flex items-center justify-center'><h5>{userObject.userData.name}</h5></div>
    </Link>
  )
}

export default Usercards