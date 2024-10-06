
import { auth } from '@/auth';
import CarbonCreditsChart from './components/CarbonCreditsChart';
import CarbonCreditsData from './components/CarbonCreditsData';

const Dashboard = async () => {
    const session = await auth()
    const aadharNumber = session?.user?.aadharNumber || '';
    console.log(session?.user);
    
  
    return (
        <>
            <div>Farmer Homepage</div>
            <h2>Welcome, {session?.user?.name}!</h2> 

            <div className="flex flex-col items-center w-full"> {/* Centering and full width */}
                <div className="w-3/4"> {/* Set the desired width for both components */}
                    <CarbonCreditsData aadharNumber={aadharNumber} />
                </div>

                <div className="w-3/4"> {/* Matching width with CarbonCreditsData */}
                    <CarbonCreditsChart aadharNumber={aadharNumber} />
                </div>
            </div>
            
            
        </>       
    )
}

export default Dashboard