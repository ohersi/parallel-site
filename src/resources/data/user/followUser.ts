export async function FollowUser(id: number) {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/users/follow/user/${id}`, {
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

        if (res.status === 404) {
           return { success: false }
        };

        return { success: true }
    }
    catch (error: any) {
        throw new Error(error);
    };
};