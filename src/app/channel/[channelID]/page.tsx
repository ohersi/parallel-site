// Packages
import axios from 'axios';
import { Metadata } from 'next';
// Imports
import { Channel, Block } from '@/app/interfaces';
import { timeAgo } from '@/utils/timeAgo';

interface PageProps {
    params: {
        channelID: string
    }
}

// TODO: Use state management to fetch data and populate pages (Redux?)
async function getChannelData(props: PageProps) {

    const res = await axios.get(`http://localhost:3000/api/v1/channels/${props.params.channelID}`);

    console.log('data fetched');

    // Contains Page info and channel data
    const data = await res.data;

    return data;
}

// Dynamic Metadata for Pages
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {

    const data = await getChannelData(props);

    const channel: Channel = data.data;

    return { title: `${channel.title} — Parallel` };
}

const page = async (props: PageProps) => {

    // database fetching
    const data = await getChannelData(props);

    const channel: Channel = data.data;

    return (
        <>
            <div>
                <h1>{channel.title}</h1>
                <h3>{channel.description}</h3>
            </div>

            <div>
                {
                    channel.blocks.map((block: Block) => (
                        <div>
                            <h4>#{block.id} - {block.title} </h4>
                            <h4>{block.image_url}</h4>
                            <h4>Last updated {timeAgo(block.date_updated)}</h4>
                        </div>
                    ))
                }
            </div>
        </>

    )
};

export default page;