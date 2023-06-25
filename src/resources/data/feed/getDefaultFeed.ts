export async function GetDefaultFeed() {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/feed`, {
            next: { revalidate: 10 },
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message);
        }

        const data = await res.json();

        return data;
    }
    catch (error: any) {
        throw new Error(error);
    };
}