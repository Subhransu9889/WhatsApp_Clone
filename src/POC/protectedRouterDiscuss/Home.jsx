import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

function Home(props) {
  const setisLogedin = props.setisLogedin;
  const name = props.name;
  const logoutHandler = async () => {
    //logout wala logic 
    await signOut(auth);

    setisLogedin(false);
    alert("Are you sure to Logedout");
  }
  return (
    <>
      <h1>hey! {name} you are in home now</h1>
      <button onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default Home