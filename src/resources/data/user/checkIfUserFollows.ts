"use client";
import useSWR from "swr";

export function CheckIfUserFollows(id: number) {

    const url = `http://localhost:3000/api/v1/users/connection/${id}`;

    const fetcher = (url: any) => fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
        },
        credentials: 'include',
        next: { revalidate: 10 },
    }).then(res => res.json())

    const { data, error, isLoading } = useSWR(url, fetcher);

    return {
        follow: data,
        isLoading,
        error
    };
};