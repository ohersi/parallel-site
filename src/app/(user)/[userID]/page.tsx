// Packages
import { Metadata } from 'next';
import Link from 'next/link';
// Imports
import { IBlock, IChannel, IPageProps, IUser } from '@/utils/types/types';
import { getUserData } from '@/resources/data/user/getUserData';
import { GetUserChannels } from '@/resources/data/channel/getUserChannels';
import BlockGrid from '@/components/block/grid.blocks';
import Header from '@/components/header/header';
import HeaderTitle from '@/components/header/title.header';
import HeaderInfo from '@/components/header/info.header';
import HeaderAction from '@/components/header/header.action';
import CreateChannelButton from '@/components/button/channel/createChannel.button';
import ChannelFormModal from '@/components/modal/channelForm.modal';
import styles from "@/styles/pages/user.page.module.scss";
import { timeAgo } from '@/resources/timeAgo';

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
    <div>
      <div className={styles.page}>
        <Header
          title={<HeaderTitle props={user} />}
          action={<HeaderAction userID={user.id} />}
          info={<HeaderInfo props={user} params={props.params.userID} />}
        />

        <CreateChannelButton />

        <div className={styles.page__grid}>
          {
            userChannels ?
              userChannels.map((data: Data) => (
                <div
                  className={styles.page__grid__row}
                  key={data.channel.id}
                >

                  <div className={styles.page__grid__row__text}>
                    <div className={styles.page__grid__row__text__title}>
                      <Link href={`/${user.slug}/${data.channel.slug}`}>
                        {data.channel.title}
                      </Link>
                    </div>
                    <div className={styles.page__grid__row__text__info}>
                      <Link href={`/${user.slug}/${data.channel.slug}`}>
                        by {user.full_name}
                        &nbsp; • &nbsp;
                        {timeAgo(data.channel.date_created)}
                      </Link>
                    </div>
                  </div>

                  <div className={styles.page__grid__row__item}>
                    {
                      data.blocks.map((block: IBlock) => (
                        <BlockGrid
                          block={block}
                          channelID={data.channel.id}
                          channelUser={user.full_name}
                          channelTitle={data.channel.title}
                          key={block.id} />
                      ))
                    }
                  </div>

                  <div className={styles.page__grid__row__info}>
                    {
                      data.total_blocks ?
                        <span>+{data.total_blocks} more blocks</span>
                        : null
                    }
                  </div>

                </div>
              ))
              : null
          }
        </div>
        {/* <div>Channels: {JSON.stringify(userChannels)}</div> */}
        <ChannelFormModal />
      </div>
    </div >
  )
}

export default UserPage;