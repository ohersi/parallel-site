import { IChannelPayload } from "@/utils/types/types";

export async function CreateChannel(payload: IChannelPayload) {
    try {
        const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/v1/channels/`, {
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