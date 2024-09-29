import { handleSignOut } from '@/actions/login';

import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import React from 'react'
import DisplayFarmers from '../components/DisplayFarmers';

const Dashboard = async () => {
  const session = await auth()
  console.log(session?.user);
  return (
    <>
      <div className="w-3/4 mx-auto">
        <div>MSME Homepage</div>
        <h2>Welcome, {session?.user?.businessName}!</h2> {/* This should show the business name */}
        <h3>Contact Person: {session?.user?.contactPerson}</h3> {/* This shows the contact person */}
        <h3>Contact Number:{session?.user?.phoneNumber}</h3>
        <h3>Address:{session?.user?.businessAddress}</h3>
        <h2>Current Emissions:{session?.user?.currentEmissions}</h2>

        <form action={handleSignOut}>
          <Button type='submit'>
            Sign Out
          </Button>
        </form>

      </div>
      
      <DisplayFarmers/>

      
    </>
  )
}

export default Dashboard