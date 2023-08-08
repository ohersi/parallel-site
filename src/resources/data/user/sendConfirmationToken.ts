export const sendConfirmationToken = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/v1/registration', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
            },
            credentials: 'include',
            cache: 'no-store',
        });

        const data = await res.json();

        if (!res.ok) {
            return { success: false, message: data };
        }

        return { success: true, message: data };
    }
    catch (error: any) {
        throw new Error(error);
    }
}