"use client";
import useSWRMutation from 'swr/mutation';

export function LogOutUser() {

    const url = '/api/logout';

    const fetcher = (url: any) => fetch(url, {
        method: 'POST',
        cache: 'no-store'
    })
        .then((res) => res.json());

    const { trigger, data, error } = useSWRMutation(url, fetcher);

    return {
        trigger,
        data,
        error
    };
};