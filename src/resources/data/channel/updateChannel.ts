import { IChannelPayload } from "@/utils/types/types";

export async function UpdateChannel(payload: IChannelPayload, channelID: number) {
    try {
        const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/v1/channels/${channelID}/update`, {
            method: 'PUT',
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

        if (res.status === 500) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message);
        }

        const data = await res.json();

        const updatedChannel = data.updated;

        return updatedChannel;
    }
    catch (error: any) {
        throw new Error(error);
    }
}