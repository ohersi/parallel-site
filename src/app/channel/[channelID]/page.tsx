// Packages
import { Metadata } from 'next';
// Imports
import Header from '@/components/header/header';
import HeaderInfo from '@/components/header/info.header';
import HeaderTitle from '@/components/header/title.header';
import ChannelBlocks from '@/components/channel/blocks.channel';
import { IChannel, IBlock, IPageProps } from '@/utils/types/types';
import { getChannelData } from '@/resources/data/channel/getChannelData';
import styles from "@/styles/channel/channel.module.css";

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