import { IPageProps } from "@/utils/types/types";

export async function GetUserChannels(id: string) {

    try {
        const res = await fetch(`http://localhost:3000/api/v1/users/${id}/channels?limmit=3`, {
            next: { revalidate: 10 },
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message);
        }

        // Contains Page info and channel data
        const data = await res.json();

        return data;
    }
    catch (error: any) {
        throw new Error(error);
    };
};