import React from 'react'
import { useParams } from 'react-router-dom'
import Spinner from './Spinner'

const PinDetail = () => {
  const [pin, setPin] = useState(null)
  const [pinDetail, setPinDetail] = useState(null)
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)
  const {pinId} = useParams()

  if(pinDetail) return <Spinner message='Loading Pin ...'/>

  const fetchPinDetail =() => {
    
  }
  return (
    <div className='flex xl-flex-row flex-col m-auto bg-white' style={{maxWidth:'150'}}>
      <div className='flex justify-center items-center md:items-start flex-initial'></div>
    </div>
  )
}

export default PinDetail