// Packages
import { Metadata } from 'next';
// Imports
import Channel from '@/components/channel/channel';
import Header from '@/components/header/header';
import HeaderInfo from '@/components/header/info.header';
import HeaderTitle from '@/components/header/title.header';
import HeaderAction from '@/components/header/header.action';
import ChannelFormModal from '@/components/modal/channelForm.modal';
import BlockFormModal from '@/components/modal/blockForm.modal';
import { getChannelData } from '@/resources/data/channel/getChannelData';
import { IPageProps, IPageResults } from '@/utils/types/types';

// Dynamic Metadata for Pages
export const generateMetadata = async (props: IPageProps): Promise<Metadata> => {
  try {
    const res = await getChannelData(props) as IPageResults;
    const channel = res.data;

    return { title: `${channel.title} — Parallel` };
  }
  catch (error: any) {
    return { title: `Error — Parallel` };
  };
};

const ChannelPage = async (props: IPageProps) => {

  // database fetching
  const res = await getChannelData(props) as IPageResults;;
  const channel = res.data;
  const user = channel.user;

  return (
    <>
      <Header
        title={<HeaderTitle title={channel.title} />}
        action={<HeaderAction channelUser={user} />}
        info={<HeaderInfo props={channel} />}
      />

      <Channel initial={res} />

      <ChannelFormModal channel={channel} />

      <BlockFormModal channelID={channel.id} />
    </>
  )
};

export default ChannelPage;