"use client";
// Packages
import { redirect } from "next/navigation";
import useSWR from "swr";
// Imports
import { IPageProps } from "@/utils/types/types";

// async function logInUser(props: IPageProps) {

//     const payload = {
//         email: 'admin@email.com',
//         password: 'Password123!',
//     };

//     const res = await fetch('http://localhost:3000/api/v1/users/login', {
//         method: 'POST',
//         body: JSON.stringify(payload),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });

//     const data = await res.json();

//     return data;
// }

async function logInUser() {

    const payload = {
        email: process.env.NEXT_PUBLIC_TEST_EMAIL,
        password: process.env.NEXT_PUBLIC_TEST_PASSWORD,
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
}

// const LogInPage = async (props: IPageProps) => {

//     const data = await logInUser(props);

//     return (
//         <>
//             <div>LOGIN PAGE</div>
//             <div>{JSON.stringify(data)}</div>
//         </>
//     )
// }

// function handleClick () {

//     const { data, error } = useSWR('admin@email.com', logInUser);
//     return { data, error};
// }   

const LogInPage =  () => {

    const { data, error } = useSWR('admin@email.com', logInUser);

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>;

    const user = data;
    console.log(user);

    return (
        <>
            <div>LOGIN PAGE</div>
            <div>{JSON.stringify(user)}</div>
        </>
    )
}

export default LogInPage;