"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input"; // Ensure you have this component
import Link from 'next/link';
import {  useRouter } from 'next/navigation';
import axios from 'axios';
// import { isValidNumber } from 'aadhaar-validator';

 // For navigation
// const validateAadhar = (aadharNumber: string) => {
//   return isValidNumber(aadharNumber);
// };

const SignupPage = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const signup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);

    const signupData = {
      name : formData.get("username"),
      aadharNumber : formData.get("aadhar"),
      password : formData.get("password"),

    };
    console.log('Signup Data:', signupData);

    if (!signupData.aadharNumber || !signupData.password || !signupData.name){
      setError("Please provide all details");
      return;
    }

    // Validation function using the library
    // if (!validateAadhar(aadharNumber)) {
    //   throw new Error("Invalid Aadhaar number."); 
    // }

    //Handling API calls with axios
    try {
      const response = await axios.post("/api/farmer/signup", signupData);
      // Handle successful signup (e.g., redirect to login)
      if (response.status === 201) {
        setError(null);
        router.push("/login")
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || "An error occurred");
      } else {
        setError("Error connecting to database: " + (err as Error).message);
      }
    }
  };




  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up (Farmer Login)</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>} {/* Display error */}

        <form onSubmit={signup}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <Input name='username' type="text" id="username" placeholder="Enter your Full Name" className="border rounded-md w-full py-2 px-3" required />
          </div>

          <div className="mb-4">
            <label htmlFor="aadhar" className="block text-sm font-medium text-gray-700 mb-1">
              Aadhar Number
            </label>
            <Input name="aadhar" type="text" id="aadhar" placeholder="Enter your Aadhar Card Number" className="border rounded-md w-full py-2 px-3" required />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input name='password'  type="password" id="password" placeholder="Enter your password" className="border rounded-md w-full py-2 px-3" required />
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
