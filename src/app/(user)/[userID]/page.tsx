// Packages
import { Metadata } from 'next';
import Link from 'next/link';
// Imports
import { IBlock, IChannel, IPageProps, IUser } from '@/utils/types/types';
import { getUserData } from '@/resources/data/user/getUserData';
import { GetUserChannels } from '@/resources/data/channel/getUserChannels';
import { GetUserBlocks } from '@/resources/data/block/getUserBlocks';
import BlockGrid from '@/components/block/grid.blocks';
import Header from '@/components/header/header';
import HeaderTitle from '@/components/header/title.header';
import HeaderInfo from '@/components/header/info.header';
import HeaderAction from '@/components/header/header.action';
import CreateChannelButton from '@/components/button/channel/createChannel.button';
import ChannelFormModal from '@/components/modal/channelForm.modal';
import styles from "@/styles/pages/user.page.module.scss";
import { timeAgo } from '@/resources/timeAgo';
import User from '@/components/user/user';

type Data = {
  channel: IChannel;
  blocks: IBlock[];
  total_blocks: number;
}

// Dynamic Metadata for Pages
export const generateMetadata = async (props: IPageProps): Promise<Metadata> => {
  try {
    const user = await getUserData(props) as IUser;
    return { title: `${user.full_name} — Parallel` };
  }
  catch (error: any) {
    return { title: `Error — Parallel` };
  };
};

const UserPage = async (props: IPageProps) => {

  const user = await getUserData(props) as IUser;
  let userID = user.id.toString()
  const channels = await GetUserChannels(userID);
  const userBlocks = await GetUserBlocks(userID);
  const userChannels = channels?.data;

  // TODO: Move CreateChannelButton to different component

  return (
    <div>
      <div className={styles.page}>
        <Header
          title={<HeaderTitle props={user} />}
          action={<HeaderAction userID={user.id} />}
          info={<HeaderInfo props={user} params={props.params.userID} />}
        />

        {/* <CreateChannelButton /> */}

        <User user={user} userChannels={userChannels} userBlocks={userBlocks} />

        <ChannelFormModal />
      </div>
    </div >
  )
}

export default UserPage;