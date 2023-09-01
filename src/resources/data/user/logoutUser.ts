"use client";
import useSWRMutation from 'swr/mutation';

export function LogOutUser() {

    const externalURL = `http://${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/logout`;
    const internalURL = '/api/logout';

    // destroy session on redis
    const fetcher = (externalURL: any) => fetch(externalURL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Credentials': "true",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
        },
        credentials: 'include',
        cache: 'no-store'
    })
        .then(async (res) => {

            const message = await res.json();

            if (!message.success) return { success: false };

            // Remove client session cookie
            fetch(internalURL, {
                method: 'POST',
                credentials: 'include',
                cache: 'no-store'
            })

            return message.success;
        });

    const { trigger, data, error } = useSWRMutation(externalURL, fetcher);

    return {
        trigger,
        data,
        error
    };
};