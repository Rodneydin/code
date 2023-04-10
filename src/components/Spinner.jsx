import React from 'react'
import * as Loader from 'react-loader-spinner'

const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <Loader
         type='Circles'
         colour='#00BFFF'
         height = {60}
         width ={200}
         />
         <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner