export async function DisconnectBlock(blockID: number, channelID: number) {
    
    try {
        const res = await fetch(`http://localhost:3000/api/v1/blocks/${blockID}/disconnect?channel=${channelID}`, {
            method: 'DELETE',
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