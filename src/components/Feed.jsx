import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { searchQuery } from '../utils/data'

import { client } from '../client'
//import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'


const Feed = () => {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(false)
  const {categoryId} = useParams()

  useEffect(() => {
    setLoading(true)
  
    if(categoryId) {
      const query = searchQuery(categoryId)

      client.fetch(query)
       .then((data) => {
        setPins(data)
       })
    }
    else{
      
    }
  }, [categoryId])
  

 //  if (loading) return <Spinner message='We are adding new ideas to your feed' />
  return (
    <div>{pins && <MasonryLayout pins={pins}/>}</div>
  )
}

export default Feed