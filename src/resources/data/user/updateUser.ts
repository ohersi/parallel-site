import { IUserPayload } from "@/utils/types/types";

export async function UpdateUser(payload: IUserPayload) {

    // console.log(`Payload: ${JSON.stringify(payload)}`);

    try {
        const res = await fetch('http://localhost:3000/api/v1/users/update', {
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

        console.log('data fetched');

        const data = await res.json();
        const updatedUser = data.updated;

        return updatedUser;
    }
    catch (error: any) {
        throw new Error(error);
    }
};