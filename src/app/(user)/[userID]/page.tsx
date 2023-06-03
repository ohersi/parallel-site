// Packages
// Imports
import { IBlock, IChannel, IPageProps, IUser } from '@/utils/types/types';
import { getUserData } from '@/resources/data/user/getUserData';
import { GetUserChannels } from '@/resources/data/channel/getUserChannels';
import ChannelBlocks from '@/components/channel/blocks.channel';
import styles from "@/styles/channel/channel.module.css";
import { Metadata } from 'next';

type Data = {
  channel: IChannel;
  blocks: IBlock[];
  total: number;
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
  const userChannels = res.data;

  return (
    <>
      <div>User: {JSON.stringify(user)}</div>
      <div>Channels:
        {
          userChannels ?
            userChannels.map((data: Data) => (
              <div>
                <h1>{data.channel.title}</h1>
                <div className={styles.channel_blocks_container}>
                  {
                    data.blocks.map((block: IBlock) => (
                      <ChannelBlocks block={block} key={block.id} />
                    ))
                  }
                </div>
              </div>
            ))
            : null
        }
      </div>
      <div>Channels: {JSON.stringify(userChannels)}</div>
    </>
  )
}

export default UserPage;