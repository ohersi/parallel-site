import { IUser } from "@/utils/types/types";

export async function searchUsers(input: string) {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/search/users?name=${input}`, {
            next: { revalidate: 30 },
        });

        if (res.status === 404) {
            return null;
        };

        if (res.status === 500) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message);
        }

        const data = await res.json() as IUser[];

        return data;

    } catch (error: any) {
        throw new Error(error);
    }
}