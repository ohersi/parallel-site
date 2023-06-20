import { IPageProps } from "@/utils/types/types";

export async function getChannelData({ params: { channelID } }: IPageProps) {

    try {
        const res = await fetch(`http://localhost:3000/api/v1/channels/title/${channelID}?limit=2`, {
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