import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'


import {FcGoogle} from 'react-icons/fc'
import {AiFillFacebook} from 'react-icons/ai'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { auth } from '../utils/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { client } from '../client'





 const Login = () => {
  const [user, loading] = useAuthState(auth)
  const googleProvider =new GoogleAuthProvider ();
  const navigate = useNavigate();
  
  const GoogleLogin = async (result) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
    localStorage.setItem('user', JSON.stringify(user));
      const { displayName, uid, photoURL} = user;
      let doc = {
        _id: uid,
        _type: 'user',
        userName: displayName,
        image: photoURL,
      }


      client.createIfNotExists(doc)
       .then(() => {
        navigate('/',{ replace: true })
       }) 
       
      
    } catch (error) {
      console.error(error); // You might send an exception to your error tracker like AppSignal
   
    }
  };
  
  
   
   


  return (
    <div className='flex justify-start items-center h-screen w-screen  flex-col'>
        <div className='relative w-full h-full'>
            <video
             src={shareVideo}
             type="video/mp4"
             loop
             controls={false}
             autoPlay
             muted 
             
             className='w-full h-full object-cover '
            />

            <div 
              className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
            <div className='p-5'>
                <img
                  src={logo}
                  alt="logo"
                  width="130px" />
            </div>

              <div className='shadow-2xl flex flex-col gap-4'>
              
                  <button
                   type='button'
                   className='bg-white flex justify-center items-center cursor-pointer p-3 outline-none rounded-lg '
                   onClick={GoogleLogin}
                   
                  >
                    <FcGoogle className='mr-4'/> Sign in with Google
                  </button>
                  <button
                   className=' gap-2 bg-white flex justify-center items-center cursor-pointer p-3 outline-none rounded-lg '
                  >
                    <AiFillFacebook className='text-2xl text-blue-700'/>Sign in with Facebook
                  </button>
               
                 
              </div>
            </div>
        </div>
    </div>
  )
}
export default Login;
