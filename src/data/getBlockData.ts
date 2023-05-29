import { IBlock, IPageProps } from "@/utils/types/types";

export async function getBlockData({ params }: IPageProps) {

    const res = await fetch(`http://localhost:3000/api/v1/blocks/${params.id}`, {
        next: { revalidate: 10 },
    });

    const data = await res.json() as IBlock;

    return data;
};