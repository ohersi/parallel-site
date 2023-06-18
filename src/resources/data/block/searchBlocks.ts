import { IBlock } from "@/utils/types/types";

export async function searchBlocks(input: string) {
    console.log(`block input: ${input}`)
    try {
        const res = await fetch(`http://localhost:3000/api/v1/search/blocks?title=${input}`, {
            next: { revalidate: 30 },
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message);
        }

        // Contains Page info and channel data
        const data = await res.json() as IBlock[];

        return data;

    } catch (error: any) {
        throw new Error(error);
    }
}