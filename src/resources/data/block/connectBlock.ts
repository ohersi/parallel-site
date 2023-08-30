export async function ConnectBlock(blockID: number, channelID: number | undefined) {

    if (!channelID) return { success: false };

    try {
        const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/v1/blocks/${blockID}/connect?channel=${channelID}`, {
            method: 'POST',
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