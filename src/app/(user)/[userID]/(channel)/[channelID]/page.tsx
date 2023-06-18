// Packages
import { Metadata } from 'next';
// Imports
import { getChannelData } from '@/resources/data/channel/getChannelData';
import Header from '@/components/header/header';
import HeaderInfo from '@/components/header/info.header';
import HeaderTitle from '@/components/header/title.header';
import HeaderAction from '@/components/header/header.action';
import BlockGrid from '@/components/block/grid.blocks';
import ChannelFormModal from '@/components/modal/channelForm.modal';
import BlockFormModal from '@/components/modal/blockForm.modal';
import CreateBlockButton from '@/components/button/block/createBlock.button';
import { IChannel, IBlock, IPageProps } from '@/utils/types/types';
import styles from "@/styles/channel/channel.module.css";

  // TODO: Move CreateBlockButton to different component

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
        action={<HeaderAction channelUser={user} />}
        info={<HeaderInfo props={channel} />}
      />
      
      <div className={styles.channel_blocks_container}>

        <CreateBlockButton />

        {
          channel.blocks.map((block: IBlock) => (
            <BlockGrid block={block} channelID={channel.id} key={block.id} />
          ))
        }

      </div>

      <ChannelFormModal channel={channel} />

      <BlockFormModal channelID={channel.id} />
    </>
  )
};

export default ChannelPage;