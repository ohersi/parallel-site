"use client";
import useSWR from "swr";

export function CheckIfUserFollowsUser(userID: number | null, loggedInUserID: number | null) {

    let empty = false;

    if (userID == undefined || loggedInUserID == userID || loggedInUserID == null) {
        empty = true
    }

    const url = `http://${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/connection/${userID}`;

    const fetcher = (url: any) => fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
        },
        credentials: 'include',
        cache: 'no-store',
    }).then(res => res.json())

    const { data, error, mutate } = useSWR(empty ? '' : url, empty ? () => { } : fetcher);

    return {
        followUser: data,
        mutate,
        error,
        url
    };

};