export async function getUserFollowers(slug: string) {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/users/${slug}/followers`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
            },
            credentials: 'include',
            next: { revalidate: 10 },
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