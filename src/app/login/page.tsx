import LoginForm from '@/components/ui/client/loginform';
import Link from 'next/link'; // For navigation, if needed

const LoginPage = async () => {
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login </h2>
        <LoginForm />  
        <p className="text-center mt-4">
          Don't have an account? 
        </p>
        <p className="text-center mt-4">
          <Link href="/signup/farmer" className="text-blue-500 hover:underline">Sign up as Farmer</Link> / <Link href="/signup/msme" className="text-blue-500 hover:underline">Sign up as MSME</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;