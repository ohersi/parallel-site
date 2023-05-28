"use client";
// Packages

// Imports
import LoginForm from "@/components/forms/login-form/login-form";

async function LogInUser(email: string, password: string) {

    const payload = {
        email: email,
        password: password,
    };

    const res = await fetch('http://localhost:3000/api/v1/users/login', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
        },
        credentials: 'include',
    });

    console.log('data fetched');

    const data = res.json();

    return data;
};

const LogInPage = () => {

    return (
        <>
            <div>LOGIN PAGE</div> { }
            <LoginForm LogInUser={LogInUser} />
        </>
    )
}

export default LogInPage;