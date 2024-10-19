import LoginForm from '@/components/ui/client/loginform';
import Link from 'next/link'; // For navigation, if needed

const LoginPage = async () => {
  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/images/homepage-bg.jpg')] bg-cover bg-center opacity-60"></div>

      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <LoginForm />
          <p className="text-center mt-4">
            Don't have an account?
          </p>
          <p className="text-center mt-4">
            <Link href="/signup/farmer" className="text-black hover:underline hover:text-green-600">Sign up as Farmer</Link> / <Link href="/signup/msme" className="text-black hover:underline hover:text-green-600">Sign up as MSME</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
