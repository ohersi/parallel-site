import { IChannel } from "@/utils/types/types";

export async function searchChannels(input: string) {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/search/channels?title=${input}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
            },
            next: { revalidate: 60 },
        });

        if (res.status === 404) {
            return null;
        };

        if (res.status === 500) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message);
        }

        const data = await res.json() as IChannel[];

        return data;

    } catch (error: any) {
        throw new Error(error);
    }
}