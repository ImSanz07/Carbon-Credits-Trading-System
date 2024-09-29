import { auth } from '@/auth';
import React from 'react'

const farmerHome = async () => {
  const session = await auth();
  console.log("Session", session);
  return (
    <div>This is the Homepage</div>
  )
}

export default farmerHome