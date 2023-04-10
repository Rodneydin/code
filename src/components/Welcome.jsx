import React from 'react'
import { Link } from 'react-router-dom'

import { auth } from '../utils/firebase'

import {useAuthState} from 'react-firebase-hooks/auth'

const welcome = () => {
  const [user, loading] = useAuthState(auth)
  return (
    <div className='flex '>
        <h3>Welcome {user.displayName}</h3>
        {user && (
                <div>
                  
                  <Link >
                    <img src={user.photoURL} alt="icon"
                    className='w-10 rounded-full gap-9 items-center' />
                    
                  </Link>
                </div> 
         )}
    </div>
  )
}

export default welcome