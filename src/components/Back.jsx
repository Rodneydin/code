import React from 'react'
import pexelsVideo from '../assets/pxl.mp4'
import Welcome from './welcome';

const backcomp = () => {
  return (
    <div className='flex justify-start items-center'>
      <div className='w-full'>
        <video
            src={pexelsVideo}
            type="video"
            loop 
            autoPlay 
            controls={false}
            className='w-full h-full object-cover '
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <h2 className='text-3xl underline'>hello</h2>
          <div className='shadow-2xl'>
                <button >Submit</button>
              </div>
        </div>
    </div>
    </div>
  )
}

export default backcomp;