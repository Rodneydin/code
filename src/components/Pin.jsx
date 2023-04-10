import React ,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'

import {client, urlFor} from '../client'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../utils/firebase'


const Pin = ({ pin}) => {
    const [postHovered, setPostHovered] = useState(false)
    const navigate = useNavigate()
    const [user, loading] = useAuthState(auth)
    const { postedBy, image, _id, destination,} = pin;
   

    let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?.uid);
    const savePin = (id) => {
      if(!alreadySaved)
      

      client
       .patch(id)
       .setIfMissing({ save:[]})
       .insert('after', 'save[-1]', [{
        _key:uuidv4(),
        userId: user.uid,
        postedBy: {
          _type: 'postedBy',
          _ref: user.uid
        }
       }] )
       .commit()
       .then(() =>{
        window.location.reload();
        
       })
    }
    

    const deletePin = (_id) =>{
      client
       .delete(_id)
       .then(() => {
        window.location.reload()
       })
    }
    
  return (
    <div className='m-2 '>
        <div
         className='relative cursor-zoom-in w-auto rounder-lg overflow-hidden transition-all duration-500 ease-in-out hover:shadow-lg '
         onMouseEnter={() => setPostHovered(true)}
         onMouseLeave={() => setPostHovered(false)}
         onClick={() => navigate(`/pin-detail/${_id}`)}
        >
            <img src={(urlFor(image).width(250).url())} alt="user-post" className='rounded-lg' />
            {postHovered && (
                <div 
                 className='absolute top-0 w-full h-full flex-col justify-between p-1 pt-2 pb-2 pr-2 z-50'
                 style={{height:'100%'}}
                 >
                  <div className='flex items-center justify-between'>
                      <div className='flex gap-2'>
                        <a
                         href={`${image ?.asset?.url}?dl=`}
                         download
                         onClick={(e) => e.stopPropagation()}
                         className=' bg-white w-8 h-8 rounded-full flex items-center justify-center text-dark text-xl opacity-70 hover:opacity-100 hover:shadow-md outline-none'
                        >
                          <MdDownloadForOffline/>
                         </a>
                      </div>
                      {alreadySaved ? (
                        <button
                          type='button'
                          className='bg-red-500 opacity-70 hover:opacity font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                        >{save?.length}{""} Saved</button>
                      ): (
                        <button
                        onClick={(e) =>{
                          e.stopPropagation()
                          savePin(_id)
                        }}
                        className='bg-red-500 opacity-70 hover:opacity-100 font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                        > Save</button>
                      )}
                  </div>
                  <div className='flex justify-between items-center gap-2 w-full'>
                        {destination && (
                          <a href={destination} 
                           target ='_blank'
                           rel='noreferrer'  
                           className='bg-white flex items-center gap-2 text-black fone-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md  mb-1 bottom-4 absolute'  
                          >
                            <BsFillArrowUpRightCircleFill/>
                            {destination.length > 20 ? destination.slice(8, 20) : destination.slice(8)}
                          </a>
                        )}
                        {postedBy?._id === user.uid && (
                          <button 
                            onClick={(e) =>{
                            e.stopPropagation();
                            savePin(_id)
                            deletePin(_id);
                            }}
                            className="bg-white  p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                          >
                            <AiTwotoneDelete />
                          </button>
                        )}
                  </div>    
                 </div>
            )}
        </div>
        <Link to={`user-profile/${postedBy}`} className='flex gap-2 mt-2 items-center'>
          <img
           src={postedBy} alt="user-profile"
           className='w-8 h-8 rounded-full object-cover' />
           <p className='font-semibold capitalize'>{postedBy}</p>
        </Link>
        
    </div>
  )
}

export default Pin