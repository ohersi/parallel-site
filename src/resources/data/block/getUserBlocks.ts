import { IBlock } from "@/utils/types/types";

export async function GetUserBlocks(id: string) {

    try {
        const res = await fetch(`http://localhost:3000/api/v1/users/${id}/blocks`, {
            next: { revalidate: 10 },
        });

        if (res.status === 500) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message);
        };

        if (res.status === 404) {
            return null;
        };

        // Contains Page info and channel data
        const data = await res.json() as IBlock[];

        return data;
    }
    catch (error: any) {
        throw new Error(error);
    };
};