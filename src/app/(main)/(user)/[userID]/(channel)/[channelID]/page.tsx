// Packages
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
// Imports
import Channel from '@/components/channel/channel';
import Header from '@/components/header/header';
import HeaderInfo from '@/components/header/info.header';
import HeaderTitle from '@/components/header/title.header';
import HeaderAction from '@/components/header/header.action';
import ChannelFormModal from '@/components/modal/channelForm.modal';
import BlockFormModal from '@/components/modal/blockForm.modal';
import { getChannelData } from '@/resources/data/channel/getChannelData';
import { IPageProps, FEED } from '@/utils/types/types';
import styles from '@/styles/pages/channel.page.module.scss';

// // Forces dynamic behavior
// export const dynamic = 'force-dynamic';
// // Hard refresh channel data removing stale cache in browser
// export const fetchCache = 'force-no-store';

// Dynamic Metadata for Pages
export const generateMetadata = async (props: IPageProps): Promise<Metadata> => {
  try {
    const res = await getChannelData(props);

    if (!res) { notFound() };

    const channel = res.data;

    return { title: `${channel.title} — Parallel` };
  }
  catch (error: any) {
    return { title: `Error — Parallel` };
  };
};

const ChannelPage = async (props: IPageProps) => {

  // database fetching
  const res = await getChannelData(props);
  console.log(res);

  if (!res) { notFound() };

  const channel = res.data;
  const user = channel.user;

  return (
    <div className={styles.page}>
      <Header
        title={<HeaderTitle props={channel} />}
        action={<HeaderAction channelUser={user} />}
        info={<HeaderInfo props={channel} params={props.params} type={FEED.CHANNEL} />}
      />

      <Channel initial={res} />

      <ChannelFormModal channel={channel} />

      <BlockFormModal channelID={channel.id} />
    </div>
  )
};

export default ChannelPage;