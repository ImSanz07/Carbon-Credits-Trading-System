
import { auth } from '@/auth';
import CarbonEmissions from '../../../../components/CarbonEmissions';
import Hero from '../../../../components/Hero';

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


        <div className='flex-1'>
          <CarbonEmissions gstin={gstin}/>
        </div>

      </div>
        

      
    </>
  );
}

export default Dashboard