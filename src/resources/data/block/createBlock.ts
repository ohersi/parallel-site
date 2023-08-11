import { IBlockPayload } from "@/utils/types/types";

export async function CreateBlock(payload: IBlockPayload, channelID: number) {

    console.log(`BlockPayload: ${JSON.stringify(payload)} + channelID: ${channelID}`);

    try {
        const res = await fetch(`http://localhost:3000/api/v1/channels/${channelID}/add`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
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