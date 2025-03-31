import LoginForm from '@/components/ui/client/loginform';
import { Cross, CrossIcon, DoorClosedIcon, X } from 'lucide-react';
import Link from 'next/link'; // For navigation, if needed

const LoginPage = async () => {
  
  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/images/homepage-bg.jpg')] bg-cover bg-center opacity-70"></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
          {/* Close Button */}
          <div className="flex justify-end">
            <Link href="/home">
              <button className="p-1 rounded-full hover:bg-gray-200 transition duration-300">
                <X className="text-gray-700 w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Login Heading */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

          {/* Login Form */}
          <LoginForm />

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?
          </p>
          <p className="text-center mt-2">
            <Link
              href="/signup/farmer"
              className="text-green-600 font-medium hover:underline transition"
            >
              Sign up as Farmer
            </Link>{" "}
            /
            <Link
              href="/signup/msme"
              className="text-green-600 font-medium hover:underline transition"
            >
              {" "}
              Sign up as MSME
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
