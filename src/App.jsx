
import React, { useEffect } from 'react'
import Login from './components/Login'
import Home from './container/Home'
import {Routes, Route, useNavigate, BrowserRouter} from 'react-router-dom';
import Backcomp from './components/Back';
import Welcome from './components/Welcome';


const App = () => {
  
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="login" element={<Login/>}/>
      <Route path="*" element={<Home/>} />
      <Route path='back' element={<Backcomp/>} />
      <Route path='welcome' element={<Welcome/>} />
    </Routes>
    </BrowserRouter>
    
    
    </>
    
  )
}

export default App


