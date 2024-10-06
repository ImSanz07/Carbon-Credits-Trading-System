"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FormEvent } from "react";
import { redirect, useRouter } from "next/navigation";
import { FarmerLogin } from "@/actions/login";

const FarmerForm = () => {
    const router = useRouter();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const aadharNumber = formData.get("aadharNumber") as string;
        const password = formData.get("password") as string;

        if (!aadharNumber || !password) {
            return toast.error("Please Provide Email & Password");

        }

        const toastId = toast.loading("Logging In...");

        const error = await FarmerLogin(aadharNumber, password);

        if (!error) {
            toast.success("Login Successful", {
                id: toastId,
            });
            router.refresh()
        } else {
            toast.error(String(error), {
                id: toastId,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input type="text" placeholder="Aadhar Number" name="aadharNumber" />
            <Input type="password" placeholder="Password" name="password" />
            <Button type="submit">Login</Button>
        </form>
    );
};

export { FarmerForm };
