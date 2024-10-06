
import { auth } from '@/auth';
import DisplayFarmers from '../components/DisplayFarmers';
import Hero from '../components/Hero';
import CarbonEmissions from '../components/CarbonEmissions';

const Dashboard = async () => {
  const session = await auth()
  const gstin = session?.user?.gstin || '';
  console.log(session?.user);

  return (
    <>
      <div className="flex justify-center w-[90%] mx-auto space-x-4 pt-10">
        {/* Hero component on the left */}
        <div className="flex-1">
          <Hero gstin={gstin} />
        </div>

        {/* DisplayFarmers component on the right */}
        {/* <div className="flex-1">
          <DisplayFarmers />
        </div> */}

        <div className='flex-1'>
          <CarbonEmissions gstin={gstin}/>
        </div>

      </div>
        

      
    </>
  );
}

export default Dashboard