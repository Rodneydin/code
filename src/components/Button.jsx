import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';

const Buttonlog = () => {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
      });
  return (
    <div>

   
    
    <MyCustomButton onClick={() => login()}>
      Sign in with Google n🚀{' '}
    </MyCustomButton>;</div>
  )
}

export default Buttonlog;