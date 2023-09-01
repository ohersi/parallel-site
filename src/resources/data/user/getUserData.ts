import { IPageProps, IUser } from "@/utils/types/types";

export async function getUserData({ params }: IPageProps): Promise<IUser | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/name/${params.userID}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
            },
            next: { revalidate: 300 }, // Revalidate every 5mins
        });

        if (!res.ok) return null;

        if (res.status === 500) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message);
        }

        const data = await res.json() as IUser;

        return data;
    }
    catch (error: any) {
        throw new Error(error);
    }
};