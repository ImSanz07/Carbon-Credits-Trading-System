import { auth } from '@/auth'
import React from 'react'
import UserInfo from './components/UserInfo';

const Profile = async () => {
    const session = await auth()
    const aadharNumber= session?.user?.aadharNumber || '';
    
  return (
    <>
          {/* <div>Farmer Profile Page</div>
          <h2>Welcome, {aadharNumber}!</h2> */}
          <UserInfo aadharNumber={aadharNumber}/>

    </>
  )
}

export default Profile