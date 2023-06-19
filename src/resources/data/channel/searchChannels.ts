import { IChannel } from "@/utils/types/types";

export async function searchChannels(input: string) {
    console.log(`channel input: ${input}`)
    try {
        const res = await fetch(`http://localhost:3000/api/v1/search/channels?title=${input}`, {
            next: { revalidate: 30 },
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message);
        }

        // Contains Page info and channel data
        const data = await res.json();

        return data;

    } catch (error: any) {
        throw new Error(error);
    }
}