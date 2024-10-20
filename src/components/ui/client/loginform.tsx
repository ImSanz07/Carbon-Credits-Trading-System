"use client";
import { FarmerLogin, MSMELogin } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Eye,EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast"
import { toast } from "sonner"



const loginFunctions={
    farmer:FarmerLogin,
    msme:MSMELogin,
};

const LoginPage = () => {
    const router = useRouter();
    const [userType, setUserType] = useState("msme");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const identifier = formData.get("identifier") as string;      
        const password = formData.get("password") as string;

        if (!identifier || !password) {
            return toast.error("Please Provide Email & Password");
        }
        const toastId = toast.loading("Logging In...");

        const loginFunction = loginFunctions[userType];
        
        // Call the selected login function
        const error = await loginFunction(identifier, password);



        

        if (!error) {
            toast.success("Login Successful", {
                id: toastId,
                
            })
            // Redirect based on the user type
            if (userType === "farmer") {
                router.push("/farmer/home");
            } else if (userType === "msme") {
                router.push("/msme/home");
            }
        } else {
            toast.error(String(error), {
                id: toastId,
            })
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
            <div className="relative">
                <Input
                    type={passwordVisible ? "text" : "password"} // Toggle between text and password
                    name="password"
                    placeholder="Enter your password"
                    required
                />
                <button
                    type="button"
                    className="absolute right-3 top-2 text-gray-600"
                    onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                >
                    {passwordVisible ? <EyeOff /> : <Eye />}
                </button>
            </div>

            {/* Submit Button */}
            <Button className="bg-green-600" type="submit">Login</Button>
        </form>
    );
};

export default LoginPage;
