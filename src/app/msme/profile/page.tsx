import React from 'react'
import { auth } from '@/auth';
import UserInfo from './components/UserInfo';

const Profile = async () => {

    const session = await auth()
    const gstin = session?.user?.gstin|| '';

  return (
    <>
    <h2>
        Hello {gstin}
    </h2>
        <UserInfo gstin={gstin} />
    </>
  )
}

export default Profile