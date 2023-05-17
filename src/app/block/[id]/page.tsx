// Packages
import axios from 'axios';
import { Metadata } from 'next';
// Imports
import { Block, Channel, PageProps } from '@/app/interfaces';
import { timeAgo } from '@/utils/timeAgo';


// TODO: Use state management to fetch data and populate pages (Redux?)
async function getBlockData(props: PageProps) {

    const res = await axios.get(`http://localhost:3000/api/v1/blocks/${props.params.id}`);

    console.log('data fetched');

    const data = await res.data as Block;

    return data;
}

// Dynamic Metadata for Pages
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {

    const block: Block = await getBlockData(props);

    return { title: `${block.title} — Parallel` };
}

const page = async (props: PageProps) => {

    // database fetching
    const block: Block = await getBlockData(props);

    return (
        <>
            <h1>{block.title}</h1>
            <h3>{block.description}</h3>
            <h3>{block.source_url}</h3>
            <h3>{block.image_url}</h3>
            <h4>
                <time dateTime={block.date_updated} title={block.date_updated}>
                    Last updated {timeAgo(block.date_updated)}
                </time>
            </h4>
            <h5>
                {
                    block.channels.map((channel: Channel) => (
                        <div>
                            <div>CHANNEL - {channel.title}</div>
                        </div>
                    ))
                }
            </h5>
        </>
    )
};

export default page;