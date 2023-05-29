// "use client";
// Packages

// Imports
import LoginForm from "@/components/forms/login-form/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login page',
  };

const LogInPage = async () => {

    return (
        <>
            <div>LOGIN PAGE</div>
            <LoginForm/>
        </>
    )
};

export default LogInPage;