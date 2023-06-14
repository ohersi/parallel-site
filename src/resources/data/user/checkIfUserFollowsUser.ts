"use client";
import useSWR from "swr";

export function CheckIfUserFollowsUser(userID: number | null, loggedInUserID: number | null) {

    if (userID == undefined || loggedInUserID == userID || loggedInUserID == null) {

        const url = '';

        const { data, error, mutate } = useSWR(url, () => {});

        return {
            followUser: data,
            mutate,
            error,
            url
        };
    }
    else {

        const url = `http://localhost:3000/api/v1/users/connection/${userID}`;

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

        const { data, error, mutate } = useSWR(url, fetcher);

        return {
            followUser: data,
            mutate,
            error,
            url
        };
    }
};