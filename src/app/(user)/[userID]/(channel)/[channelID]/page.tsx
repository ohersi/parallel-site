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
  try {
    const res = await getChannelData(props);
    const channel: IChannel = res.data;

    return { title: `${channel.title} — Parallel` };
  }
  catch (error: any) {
    return { title: `Error — Parallel` };
  };
};

const ChannelPage = async (props: IPageProps) => {

  // database fetching
  const res = await getChannelData(props);
  const channel: IChannel = res.data;
  const user = res.data.user;

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