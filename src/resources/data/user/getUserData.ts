import { IPageProps } from "@/utils/types/types";

export async function getUserData({ params }: IPageProps) {

    const res = await fetch(`http://localhost:3000/api/v1/users/name/${params.userID}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
        },
        credentials: 'include',
        next: { revalidate: 10 },
    });

    const data = await res.json();

    return data;
};