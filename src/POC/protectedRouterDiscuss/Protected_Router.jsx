import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Home'
import ProtectedLogin from './ProtectedLogin'

function Protected_Router() {
  const [isLogedin, setisLogedin] = useState(false);
  const [name, setname] = useState(null);
  return (
    <>
      <Routes>
          <Route path='/' element={<ProtectedRoutes isLogedin={isLogedin} setisLogedin={setisLogedin} name={name}></ProtectedRoutes>}></Route>
          <Route path='/login' element={<ProtectedLogin setisLogedin={setisLogedin} setname={setname}></ProtectedLogin>}></Route>
      </Routes>
    </>
  )
}

function ProtectedRoutes({ isLogedin, setisLogedin, name}){
  if(isLogedin){
    return <Home setisLogedin={setisLogedin} name={name}></Home>
  }
  else{
    return <Navigate to='/login'></Navigate>
  }
}

export default Protected_Router