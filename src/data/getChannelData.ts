import { IPageProps } from "@/utils/types/types";

export async function getChannelData(props: IPageProps) {

    const res = await fetch(`http://localhost:3000/api/v1/channels/${props.params.id}`, {
        next: { revalidate: 10 },
    });

    // Contains Page info and channel data
    const data = await res.json();

    return data;
};