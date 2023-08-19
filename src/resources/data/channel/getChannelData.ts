import { IPageProps, IPageResults } from "@/utils/types/types";

export async function getChannelData({ params: { channelID } }: IPageProps): Promise<IPageResults | null> {

    try {
        const res = await fetch(`http://localhost:3000/api/v1/channels/title/${channelID}?limit=2`, {
            next: { revalidate: 30 },
        });

        if (res.status === 404) return null;

        if (res.status === 500) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message);
        }

        const data = await res.json() as IPageResults;

        return data;
    }
    catch (error: any) {
        throw new Error(error);
    };
};