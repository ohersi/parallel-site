import { IUser } from "@/utils/types/types";

export async function searchUsers(input: string) {
    console.log(`user input: ${input}`)
    try {
        const res = await fetch(`http://localhost:3000/api/v1/search/users?name=${input}`, {
            next: { revalidate: 30 },
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message);
        }

        // Contains Page info and channel data
        const data = await res.json() as IUser[];

        return data;

    } catch (error: any) {
        throw new Error(error);
    }
}