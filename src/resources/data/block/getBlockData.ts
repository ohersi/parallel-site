import { IBlock } from "@/utils/types/types";

export async function getBlockData(id: number) {

    const res = await fetch(`http://localhost:3000/api/v1/blocks/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
        },
        next: { revalidate: 10 },
    });

    const data = await res.json() as IBlock;

    return data;
};