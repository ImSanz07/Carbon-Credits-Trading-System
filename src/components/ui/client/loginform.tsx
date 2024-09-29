"use client";
import { FarmerLogin, MSMELogin } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const loginFunctions={
    farmer:FarmerLogin,
    msme:MSMELogin,
};

const LoginPage = () => {
    const router = useRouter();
    const [userType, setUserType] = useState("msme");
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const identifier = formData.get("identifier") as string;      
        const password = formData.get("password") as string;

        if (!identifier || !password) {
            return toast.error("Please Fill all Fields");
        }

        const toastId = toast.loading("Logging In...");

        const loginFunction = loginFunctions[userType];
        
        
        // Call the selected login function
        const error = await loginFunction(identifier, password);



        

        if (!error) {
            toast.success("Login Successful", {
                id: toastId,
            });
            // Redirect based on the user type
            if (userType === "farmer") {
                router.push("/farmer/home");
            } else if (userType === "msme") {
                router.push("/msme/home");
            }
        } else {
            toast.error(String(error), {
                id: toastId,
            });
        }

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* User Type Select */}
            <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                User Type
            </label>
            <select
                name="userType"
                id="userType"
                value={userType}
                onChange={(event) => {
                    setUserType(event.target.value);
                }}
                className="border rounded-md py-2 px-3"
                required
            >
                <option value="msme">MSME</option>
                <option value="farmer">Farmer</option>
            </select>

            {/* Identifier */}
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                {userType === "msme" ? "GSTIN" : "Aadhar Number"}
            </label>
            <Input
                type="text"
                name="identifier"
                placeholder={userType === "msme" ? "Enter your GSTIN" : "Enter your Aadhar Number"}              
                required
            />

            {/* Password */}
            <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
            />

            {/* Submit Button */}
            <Button type="submit">Login</Button>
        </form>
    );
};

export default LoginPage;
