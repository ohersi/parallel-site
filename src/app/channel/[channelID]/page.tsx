// Packages
import axios from 'axios';
import { Metadata } from 'next';
// Imports
import { Channel } from '@/app/interfaces';

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
    const channel = await getChannelData(props);

    return (
        <div>
            {JSON.stringify(channel)}
        </div>
    )
};

export default page;