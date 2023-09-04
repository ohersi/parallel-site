import { IDefaultFeedResults } from "@/utils/types/types";

export async function GetDefaultFeed(channel_lastID?: string | null | undefined, block_lastID?: string | null | undefined, limit?: number) {

    let channelParams = channel_lastID ?
        `channel_lastID=${channel_lastID}&`
        : channel_lastID === null ?
            'channel_lastID=null&'
            : '';

    let blockParams = block_lastID ?
        `block_lastID=${block_lastID}&`
        : block_lastID === null ?
            'block_lastID=null&'
            : '';
            
    let limitParams = limit ? `limit=${limit}&` : '';

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/feed?` + limitParams + channelParams + blockParams;

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
            },
            cache: 'no-store',
        });

        if (res.status === 404) {
            return null;
        };

        if (res.status === 500) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message);
        }

        const data = await res.json();

        return data as IDefaultFeedResults;
    }
    catch (error: any) {
        throw new Error(error);
    };
}