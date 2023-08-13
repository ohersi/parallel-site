// Packages
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
// COMPONENTS
import Header from '@/components/header/header';
import HeaderTitle from '@/components/header/title.header';
import HeaderInfo from '@/components/header/info.header';
import HeaderAction from '@/components/header/header.action';
import UserGrid from '@/components/user/grid.user';
// FUNCTIONS
import { getChannelData } from '@/resources/data/channel/getChannelData';
import { getChannelFollowers } from '@/resources/data/channel/getChannelFollowers';
// TYPES
import { FEED, IPageProps, IPageResults, IUser } from '@/utils/types/types';
// STYLES
import styles from '@/styles/pages/follow.page.module.scss';

// Dynamic Metadata for Pages
export const generateMetadata = async (props: IPageProps): Promise<Metadata> => {
    try {
        const res = await getChannelData(props) as IPageResults;

        if (!res) { notFound() };

        const channel = res.data;

        return { title: `Followers / ${channel.title}  — Parallel` };
    }
    catch (error: any) {
        return { title: `Error — Parallel` };
    };
};

const ChannelFollowersPage = async (props: IPageProps) => {

    const channelData = await getChannelData(props) as IPageResults;
    const res = await getChannelFollowers(props.params.channelID);

    if (!res || !channelData) { notFound() };

    const channel = channelData.data;
    const user = channel.user;
    let arr: IUser[] = [];

    for (const followers of res) {
        arr.push(followers.user);
    }

    return (
        <div className={styles.page}>
            <Header
                title={<HeaderTitle props={channel} />}
                action={<HeaderAction channelUser={user} />}
                info={<HeaderInfo props={channel} params={props.params} type={FEED.CHANNEL} />}
            />
            <div className={styles.page__box}>
                <div className={styles.page__box__title}>{arr.length} FOLLOWERS</div>

                <div className={styles.page__box__grid}>
                    {
                        arr.map((user) => (
                            <UserGrid user={user} />
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default ChannelFollowersPage;