import React from 'react'
import Sidebar from '../components/Sidebar';
import { useState, useEffect } from 'react';

import{userQuery} from '../utils/data'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import { Link,Route,Routes } from 'react-router-dom';
import Pins from './Pins'
import { useRef } from 'react';
import { client } from '../client';
import UseProfile  from '../components/UseProfile';
import logo from '../assets/logo.png'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../utils/firebase'
import Search from '../components/Search';


 const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user, loading] = useAuthState(auth)
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  const scrollRef = useRef(null)
  
  useEffect(() => {
    const query = userQuery(userInfo)
    
    client.fetch(query)
    .then((data) =>{
      
     // console.log(userInfo)
    }) 
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  
    
  }, []) 
  
  
  return (
    <div className='bg-gray-50 flex md:flex-row flex-col h-screen transition-height duration-75 ease-out' >
        <div className='hidden h-screen md:flex flex-initial'>
          <Sidebar user={user&& user}/>
          
        </div>
        <div className='flex md:hidden flex-row'>
            <div className='p-2 justify-between w-full flex flex-row items-center shadow-md'>
            <HiMenu fontSize={40} className="cursor-pointer" onClick={() =>setToggleSidebar(true)} />
            
            <Link to="/">
              <img src={logo} alt="logo" className='w-28 ' />
            </Link>
            <Link to={`user-profile/${user?._id}`}>
              <img src={user.photoURL} alt="logo" className='w-12 rounded-full ' />
            </Link>
            </div>
            {toggleSidebar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2'>
                <AiFillCloseCircle fontSize={30} className='w-25 cursor-pointer' onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar user={user&& user} closeToggle={setToggleSidebar} />
          </div>
        )}
         
        </div>
        
        <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
          <Routes>
            <Route path='/user-profile/:userId ' element={<UseProfile/>} />
            <Route path='/*' element={<Pins user={user && user}/>} />
            
          </Routes>
        </div>
    </div>
  )
}
export default Home;
