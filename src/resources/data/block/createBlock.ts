import { IBlockPayload } from "@/utils/types/types";

export async function CreateBlock(payload: IBlockPayload, channelID: number) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/channels/${channelID}/add`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Credentials': "true",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
            },
            credentials: 'include',
            cache: 'no-store',
        });

        if (!res.ok) {
            return { success: false };
        }
        return { success: true };
    }
    catch (error: any) {
        throw new Error(error);
    }
}