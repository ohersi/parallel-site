// Packages
import { Metadata } from 'next';
// Imports
import { IChannel, IBlock, IPageProps } from '@/utils/types/types';
import Header from '@/components/header/header';
import HeaderTitle from '@/components/header/header-title';
import HeaderInfo from '@/components/header/header-info';
import ChannelBlocks from '@/components/channel/channel-blocks';
import styles from "@/styles/channel/channel.module.css";

async function getChannelData(props: IPageProps) {

    const res = await fetch(`http://localhost:3000/api/v1/channels/${props.params.id}`, {
        next: { revalidate: 10 },
    });

    // Contains Page info and channel data
    const data = await res.json();

    return data;
}

// Dynamic Metadata for Pages
export const generateMetadata = async (props: IPageProps): Promise<Metadata> => {

    const data = await getChannelData(props);

    const channel: IChannel = data.data;

    return { title: `${channel.title} — Parallel` };
}

const ChannelPage = async (props: IPageProps) => {

    // database fetching
    const data = await getChannelData(props);

    const channel: IChannel = data.data;

    return (
        <>
            <Header
                title={<HeaderTitle title={channel.title} />}
                action={<div>EDIT</div>}
                info={<HeaderInfo props={channel} />}
            />
            <div className={styles.channel_blocks_container}>
                {
                    channel.blocks.map((block: IBlock) => (
                        <ChannelBlocks block={block} key={block.id} />
                    ))
                }
            </div>
        </>
    )
};

export default ChannelPage;