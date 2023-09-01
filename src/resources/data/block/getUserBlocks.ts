import { IBlock } from "@/utils/types/types";

export async function GetUserBlocks(id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}/blocks`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
            },
            next: { revalidate: 900 }, // Revalidate every 15mins
        });

        if (res.status === 500) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message);
        };

        if (res.status === 404) {
            return null;
        };

        // Contains Page info and channel data
        const data = await res.json() as IBlock[];

        return data;
    }
    catch (error: any) {
        throw new Error(error);
    };
};