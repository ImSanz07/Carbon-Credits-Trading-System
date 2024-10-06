"use client";
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"; // Ensure you have this component
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignupPage = () => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [statesAndDistricts, setStatesAndDistricts] = useState<{ [key: string]: string[] }>({});
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [districts, setDistricts] = useState<string[]>([]);

    // Fetch states and districts from the backend API
    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get('/api/states');
                setStatesAndDistricts(response.data);
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };
        fetchStates();
    }, []);


    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedState = event.target.value;
        setSelectedState(selectedState);
        setDistricts(statesAndDistricts[selectedState] || []);
    };

    const signup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);

        const signupData = {
            name: formData.get("username"),
            aadharNumber: formData.get("aadhar"),
            phoneNumber: formData.get("phoneNumber"),
            password: formData.get("password"),
            fullAddress: formData.get("fullAddress"),
            state: formData.get("state"),
            district: formData.get("district"),
            zipCode: formData.get("zipCode"),


        };
        console.log('Signup Data:', signupData);

        if (!signupData.aadharNumber || !signupData.password || !signupData.name) {
            setError("Please provide all details");
            return;
        }

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
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up NEW (Farmer Login)</h2>
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
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <Input name="phoneNumber" type="text" id="phoneNumber" placeholder="Enter your Phone Number" className="border rounded-md w-full py-2 px-3" required />
                    </div>

                    {/* Address Fields */}
                    <div className="mb-4">
                        <label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <Input name="fullAddress" type="text" id="fullAddress" placeholder="Enter your Full Address" className="border rounded-md w-full py-2 px-3" required />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State
                        </label>
                        <select
                            name="state"
                            id="state"
                            className="border rounded-md w-full py-2 px-3"
                            value={selectedState || ""}
                            onChange={handleStateChange}
                            required
                        >
                            <option value="">Select State</option>
                            {Object.keys(statesAndDistricts).map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>
        
                    <div className="mb-4">
                        <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                            District
                        </label>
                        <select
                            name="district"
                            id="district"
                            className="border rounded-md w-full py-2 px-3"
                            required
                        >
                            <option value="">Select District</option>
                            {districts.map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>
                
                    <div className="mb-4">
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Zip Code
                        </label>
                        <Input name="zipCode" type="text" id="zipCode" placeholder="Enter your Zip Code" className="border rounded-md w-full py-2 px-3" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <Input name='password' type="password" id="password" placeholder="Enter your password" className="border rounded-md w-full py-2 px-3" required />
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
