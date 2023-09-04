export async function CheckUserToken(token: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/registration/check?token=${token}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Credentials': "true",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
            },
            credentials: 'include',
            cache: 'no-store',
        });

        if (res.status === 423) {
            return false;
        };

        if (res.status === 404 || res.status === 500) {
            return null;
        };

        const data = await res.json();

        return data.success;
    }
    catch (error: any) {
        throw new Error(error);
    };
};