import { Metadata } from "next";
import { IChannel, IPageProps } from "@/utils/types/types";

// Currently Next JS or React cache() does not cache duplicate API request when using axios

async function getTestData(props: IPageProps) {

    const res = await fetch(`http://localhost:3000/api/v1/channels/${1}`, {
        next: { revalidate: 10 },
    });

    // Contains Page info and channel data
    const data = await res.json();

    return data;
}

// Dynamic Metadata for Pages
export const generateMetadata = async (props: IPageProps): Promise<Metadata> => {

    const data = await getTestData(props); // 1st API request
    console.log('data fetched --- generateMetadata');

    const channel: IChannel = data.data;

    return { title: `${channel.title} — Parallel` };
}


const page = async (props: IPageProps) => {

    // database fetching
    const data = await getTestData(props); // 2nd API request

    const channel: IChannel = data.data;

    console.log('data fetched --- Page');

    return (
        <>
            <div>Hello testing api fetching</div>
        </>
    )
}

export default page