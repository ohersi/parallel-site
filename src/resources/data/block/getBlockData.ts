import { IBlock } from "@/utils/types/types";

export async function getBlockData(id: number) {

    try {
        const res = await fetch(`http://localhost:3000/api/v1/blocks/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
            },
            next: { revalidate: 10 },
        });

        if (res.status === 404) return null;

        if (res.status === 500) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message);
        }

        const data = await res.json() as IBlock;

        return data;
    }
    catch (error: any) {
        throw new Error(error);
    }
};