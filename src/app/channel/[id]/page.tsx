// Packages
import axios from 'axios';
import { Metadata } from 'next';
import Link from 'next/link';
// Imports
import { Channel, Block, PageProps } from '@/utils/types/types';
import Header from '@/components/header/header';
import HeaderTitle from '@/components/header/header-title';
import HeaderInfo from '@/components/header/header-info';
import ChannelBlocks from '@/components/channel/channel-blocks';
import styles from "@/styles/channel/channel.module.css";

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
            <div className={styles.channel_blocks_container}>
                {
                    channel.blocks.map((block: Block) => (
                        <ChannelBlocks block={block}/>
                    ))
                }
            </div>
        </>
    )
};

export default page;