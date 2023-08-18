// Packages
import { Metadata } from "next";
import { notFound } from "next/navigation";
// COMPONENTS
import Header from '@/components/header/header';
import HeaderTitle from '@/components/header/title.header';
import HeaderInfo from '@/components/header/info.header';
import HeaderAction from '@/components/header/header.action';
import UserGrid from '@/components/user/grid.user';
import ChannelGrid from "@/components/channel/grid.channel";
// FUNCTIONS
import { getUserData } from "@/resources/data/user/getUserData";
import { getUserFollowing } from "@/resources/data/user/getUserFollowing";
import { GetAllChannelsUserFollows } from "@/resources/data/channel/getAllChannelsUserFollows";
import { isChannel, isUserChannelFollowing, isUserFollowing } from "@/resources/helper/checkType";
// TYPES
import { FOLLOW, IChannel, IPageProps, IUser, IUserChannelFollowing, IUserFollowing } from "@/utils/types/types";
// STYLES
import styles from '@/styles/pages/follow.page.module.scss';

// Dynamic Metadata for Pages
export const generateMetadata = async (props: IPageProps): Promise<Metadata> => {
    try {
        const user = await getUserData(props);

        if (!user) { notFound() };

        return { title: `Following / ${user.full_name} — Parallel` };
    }
    catch (error: any) {
        return { title: `Error — Parallel` };
    };
};

const UserFollowingPage = async (props: IPageProps) => {

    const userData = await getUserData(props);

    if (!userData) { notFound() };

    const followedUsers = await getUserFollowing(props.params.userID);
    const followedChannels = await GetAllChannelsUserFollows(props.params.userID);

    // Sort by most recently followed
    const combined: Array<IUserFollowing | IUserChannelFollowing> = followedUsers.concat(followedChannels);

    const sortedFollowList = combined.sort((n1, n2) => {
        if (n1.date_created > n2.date_created) {
            return -1;
        }
        if (n1.date_created < n2.date_created) {
            return 1;
        }
        return 0;
    })

    // New list of just channels & user data
    let list: (IUser | IChannel)[] = [];

    for (const item of sortedFollowList) {
        if (isUserFollowing(item)) {
            list.push(item.followed_user);
        }
        if (isUserChannelFollowing(item)) {
            list.push(item.followed_channel);
        }
    }

    return (
        <div className={styles.page}>

            <Header
                title={<HeaderTitle props={userData} />}
                action={<HeaderAction userID={userData.id} />}
                info={<HeaderInfo props={userData} params={props.params} type={FOLLOW.USER} />}
            />

            <div className={styles.page__box}>
                <div className={styles.page__box__title}>{list.length} FOLLOWING</div>

                <div className={styles.page__box__grid}>
                    {
                        list.map((res) => {
                            if (isChannel(res)) {
                                return <ChannelGrid channel={res} key={res.slug} />
                            }
                            return <UserGrid user={res} key={res.id} />
                        })
                    }
                </div>
            </div>

        </div>
    )
};

export default UserFollowingPage;