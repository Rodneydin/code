import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch} from 'react-icons/io'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../utils/firebase'

const Navbar = ({ searchTerm, setSearchTerm}) => {
  const [user, loading] = useAuthState(auth)
  //const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()
  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
        <div className='flex justify-start  items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm '>
            <IoMdSearch fontSize={21} className='ml-1'/>
            <input 
             type="text"
             onChange={(e) => setSearchTerm(e.target.value)}
             placeholder='search'
             onFocus={() => navigate('/search')}
             className='p-2 w-full bg-white outline-none'
             />
             
        </div>
        <div className='flex gap-3'>
          <Link
           to={`user-profile/${user?._id}`}
           className='hidden md:block'
          >
            <img src={user.photoURL} alt="user"  className='w-12 h-9 rounded-full'/>
          </Link>
          <Link
           to='create-pin'
           className='hidden md:block'
           >
            <IoMdAdd/>
          </Link>
        </div>
    </div>
  )
}

export default Navbar