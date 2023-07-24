export async function UnfollowChannel(id: number) {
    console.log(`unfollowing channel: ${id}`)
    try {
        const res = await fetch(`http://localhost:3000/api/v1/users/unfollow/channel/${id}`, {
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
            return null;
        };

        const data = await res.json();

        return data;
    }
    catch (error: any) {
        throw new Error(error);
    };
};