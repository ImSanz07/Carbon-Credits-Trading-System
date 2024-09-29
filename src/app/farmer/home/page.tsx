import { handleSignOut } from '@/actions/login';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';

const Dashboard = async () => {
    const session = await auth()
    console.log(session?.user);
    
    return (
        <>
            <div>Farmer Homepage</div>
            <h2>Welcome, {session?.user?.name}!</h2> 
            <form action={handleSignOut}>
                <Button type='submit'>
                    Sign Out
                </Button>

            </form>

        </>
        
    )
}

export default Dashboard