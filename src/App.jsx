import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Chats from './Components/Chats'
import Pagenotfound from './Components/Pagenotfound'
import { useState, useEffect } from 'react'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'; // Retrieve state from localStorage
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn); // Update localStorage when state changes
  }, [isLoggedIn]);

  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedLogin isLogedin={isLoggedIn}><Home setisLogedin={setIsLoggedIn}></Home></ProtectedLogin>}></Route>
        <Route path='/login' element={<Login setisLogedin={setIsLoggedIn}></Login>}></Route>
        <Route path='/:chatId' element={<ProtectedLogin isLogedin={isLoggedIn}><Home setisLogedin={setIsLoggedIn}></Home></ProtectedLogin>}></Route>
        <Route path='*' element={<Pagenotfound></Pagenotfound>}></Route>
      </Routes>
    </>
  )
}

function ProtectedLogin({isLogedin, children}){
  if(isLogedin){
    return children;
  }
  else{
    return <Navigate to='/login'></Navigate>
  }
}

export default App
