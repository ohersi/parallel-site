// Packages
import { Metadata } from 'next';
// Imports
import { IBlock, IChannel, IPageProps, IUser } from '@/utils/types/types';
import { getUserData } from '@/resources/data/user/getUserData';
import { GetUserChannels } from '@/resources/data/channel/getUserChannels';
import ChannelBlocks from '@/components/channel/blocks.channel';
import Header from '@/components/header/header';
import HeaderTitle from '@/components/header/title.header';
import HeaderInfo from '@/components/header/info.header';
import HeaderAction from '@/components/header/header.action';
import styles from "@/styles/channel/channel.module.css";
import CreateChannelButton from '@/components/button/createChannel.button';
import ChannelModal from '@/components/modal/channel.modal';

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
  const res = await GetUserChannels(userID);
  const userChannels = res?.data;

  // TODO: Move CreateChannelButton to different component

  return (
    <>
      <Header
        title={<HeaderTitle title={`Parallel / ${user.full_name}`} />}
        action={<HeaderAction userID={user.id}/>}
        info={<HeaderInfo props={user} params={props.params.userID}/>}
      />
      <CreateChannelButton />
      <div>{JSON.stringify(user)}</div>
      <div>
        {
          userChannels ?
            userChannels.map((data: Data) => (
              <div key={data.channel.id}>
                <h2>{data.channel.title}</h2>
                <div className={styles.channel_blocks_container}>
                  {
                    data.blocks.map((block: IBlock) => (
                      <ChannelBlocks block={block} key={block.id} />
                    ))
                  }
                </div>
                {
                  data.total_blocks ?
                    <span>+{data.total_blocks} more blocks</span>
                    : null
                }
              </div>
            ))
            : null
        }
      </div>
      {/* <div>Channels: {JSON.stringify(userChannels)}</div> */}
      <ChannelModal />
    </>
  )
}

export default UserPage;