// Packages
import axios from 'axios';
import { Metadata } from 'next';
import Link from 'next/link';
// Imports
import Header from '@/components/header/header';
import { Channel, Block, PageProps } from '@/app/interfaces';
import { timeAgo } from '@/utils/timeAgo';
import HeaderTitle from '@/components/header/header-title';
import HeaderInfo from '@/components/header/header-info';


// TODO: Use state management to fetch data and populate pages (Redux?)
async function getChannelData(props: PageProps) {

    const res = await axios.get(`http://localhost:3000/api/v1/channels/${props.params.id}`);

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
            <Header
                title={<HeaderTitle title={channel.title} />}
                action={<div>EDIT</div>}
                info={<HeaderInfo props={channel} />}
            />
            <div>
                {
                    channel.blocks.map((block: Block) => (
                        <div>
                            <h4>#{block.id} - {block.title}</h4>
                            <h4>{block.image_url}</h4>
                            <h4>
                                <time dateTime={block.date_updated} title={block.date_updated}>
                                    Last updated {timeAgo(block.date_updated)}
                                </time>
                            </h4>
                            <Link href={`block/${block.id}`}>To Block</Link>
                        </div>
                    ))
                }
            </div>
        </>

    )
};

export default page;

interface IChannelTitle {
    channel: Channel
}

const ChannelTitle = ({ channel }: IChannelTitle) => {

    return (
        <>
            <h1>{channel.title}</h1>
            <h3>{channel.description}</h3>
        </>
    )
}