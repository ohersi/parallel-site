import { IBlock } from "@/utils/types/types";

export async function searchBlocks(input: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blocks/search?title=${input}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
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

        const data = await res.json() as IBlock[];

        return data;

    } catch (error: any) {
        throw new Error(error);
    }
}