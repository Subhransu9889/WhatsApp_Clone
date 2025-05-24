import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import {signInWithPopup} from "firebase/auth" 
import { GoogleAuthProvider } from 'firebase/auth';

function ProtectedLogin(props) {
    const Navigate = useNavigate();
    const setisLogedin = props.setisLogedin;
    const setname = props.setname;
    const loginHandler = async () => {
      //login wala logic
      const result = await signInWithPopup(auth, new GoogleAuthProvider);
      const name = result.user.displayName;
      const [surname] = name.split(" ");
      // console.log(surname);
      setname(surname);
      


        setisLogedin(true);
        // alert("logedin");
        Navigate('/');
    }
  return (
    <>
        <h2>hey! just login form here</h2>
        <button onClick={loginHandler}>Login</button>
    </>
  )
}

export default ProtectedLogin