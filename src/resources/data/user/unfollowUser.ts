export async function UnfollowUser(id: number) {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/users/unfollow/user/${id}`, {
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

        if (res.status === 404) {
            return { success: false };
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