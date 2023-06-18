"use client";
import useSWR from "swr";

export function CheckIfUserFollowsChannel(channelID: number | null, loggedInUserID: number | null) {

    let empty = false;

    if (channelID == undefined || loggedInUserID == channelID || loggedInUserID == null) {
        empty = true;
    }

    const url = `http://localhost:3000/api/v1/channels/connection/${channelID}`;

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
        followChannel: data,
        mutate,
        error,
        url
    };
};