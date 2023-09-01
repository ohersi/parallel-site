export async function UnfollowChannel(id: number) {
    try {
        const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/unfollow/channel/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Credentials': "true",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
            },
            credentials: 'include',
            cache: 'no-store',
        });

        if (res.status === 404) {
            return { success: false }
        }

        if (res.status === 500) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message);
        }

        return { success: true };
    }
    catch (error: any) {
        throw new Error(error);
    };
};