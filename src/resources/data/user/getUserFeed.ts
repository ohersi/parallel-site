import { IUserFeedResults } from "@/utils/types/types";

export async function GetUserFeed(userID: number) {
    try {
        const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userID}/feed`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Credentials': "true",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
            },
            credentials: 'include',
            next: { revalidate: 60 },
        })

        if (!res.ok) {
            return null;
        };

        const data = await res.json() as IUserFeedResults[];

        return data;
    }
    catch (error: any) {
        throw new Error(error);
    }
};