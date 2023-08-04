// Packages
import { Metadata } from 'next';
// COMPONENTS
import User from '@/components/user/user';
import Header from '@/components/header/header';
import HeaderInfo from '@/components/header/info.header';
import HeaderTitle from '@/components/header/title.header';
import HeaderAction from '@/components/header/header.action';
import ChannelFormModal from '@/components/modal/channelForm.modal';
import CreateChannelButton from '@/components/button/channel/createChannel.button';
// FUNCTIONS
import { getUserData } from '@/resources/data/user/getUserData';
import { GetUserChannels } from '@/resources/data/channel/getUserChannels';
import { GetUserBlocks } from '@/resources/data/block/getUserBlocks';
// TYPES
import { IPageProps, IUser } from '@/utils/types/types';
// STYLES
import styles from "@/styles/pages/user.page.module.scss";

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

  return (
    <div className={styles.page}>
      <Header
        title={<HeaderTitle props={user} />}
        action={<HeaderAction userID={user.id} />}
        info={<HeaderInfo props={user} params={props.params} />}
      />

      <User user={user} userChannels={userChannels} userBlocks={userBlocks} />

      <ChannelFormModal />
    </div>
  )
}

export default UserPage;