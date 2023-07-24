"use client";
// Packages
import Link from "next/link";
import useSWR from "swr";
// Imports
import { useAppSelector } from "@/store";
import UserGrid from "@/components/user/grid.user";
import ChannelGrid from "@/components/channel/grid.channel";
import BlockGrid from "@/components/block/grid.blocks";
import { GetUserFeed } from "@/resources/data/user/getUserFeed";
import { ICombinedObj, FEED, ACTION, IBlock, IChannel, IUser } from "@/utils/types/types";
import { timeAgo } from "@/resources/timeAgo";
import styles from "@/styles/components/feed/user.feed.module.scss";

// TODO: Force component refresh when logged out
const UserFeed = () => {

    const loggedInUser: IUser = useAppSelector((state) => state.User.user);
    const { data, error } = useSWR(`api/v1/feed`, () => loggedInUser ? GetUserFeed(loggedInUser.id) : null);

    if (error) return <div>failed to load</div>
    if (!data) return <div>No activity</div>;

    const feed = data?.flat();

    return (
        <div className={styles.feed}>
            {
                feed.map((item) => {
                    // Can follow user
                    if (item.data_type === FEED.USER) {
                        const user = item.data as IUser;
                        let timestamp = timeAgo(item.timestamp);
                        return <div className={styles.feed__section} key={item.timestamp}>

                            <div className={styles.feed__section__date}>
                                <div className={styles.feed__section__date__divider} />
                                <div className={styles.feed__section__date__text}>{timestamp}</div>
                                <div className={styles.feed__section__date__divider} />
                            </div>

                            <div className={styles.feed__section__item}>
                                <div className={styles.feed__section__item__text}>
                                    <Link href={`/${item.user.slug ? item.user.slug : `/`}`}>
                                        <span className={styles.feed__section__item__text__highlight}>
                                            {item.user.full_name}
                                        </span>
                                    </Link>
                                    <span>
                                        {(item.action_type).toLocaleLowerCase()}
                                    </span>
                                    <Link href={`/${user.slug}`}>
                                        <span className={styles.feed__section__item__text__highlight}>
                                            {user.full_name}
                                        </span>
                                    </Link>
                                </div>
                                <UserGrid user={user} />
                            </div>
                        </div>
                    }
                    if (item.data_type === FEED.CHANNEL) {
                        // Can follow / create channel
                        const channel = item.data as IChannel;
                        let timestamp = timeAgo(item.timestamp);
                        return <div className={styles.feed__section} key={item.timestamp}>

                            <div className={styles.feed__section__date}>
                                <div className={styles.feed__section__date__divider} />
                                <div className={styles.feed__section__date__text}>{timestamp}</div>
                                <div className={styles.feed__section__date__divider} />
                            </div>

                            <div className={styles.feed__section__item}>
                                <div className={styles.feed__section__item__text}>
                                    <Link href={`/${item.user.slug ? item.user.slug : `/`}`}>
                                        <span className={styles.feed__section__item__text__highlight}>
                                            {item.user.full_name}
                                        </span>
                                    </Link>
                                    <span>
                                        {(item.action_type).toLocaleLowerCase()}
                                    </span>
                                    <Link href={`/${channel.user?.slug}/${channel.slug}`}>
                                        <span className={styles.feed__section__item__text__highlight}>
                                            {channel.title}
                                        </span>
                                    </Link>
                                </div>
                                <ChannelGrid channel={channel} />
                            </div>

                        </div>
                    }
                    if (item.data_type === FEED.BLOCK) {
                        // Can connect block
                        const obj = item.data as ICombinedObj;
                        let timestamp = timeAgo(item.timestamp);

                        if (item.action_type === ACTION.CREATED) {
                            return <div className={styles.feed__section} key={item.timestamp}>

                                <div className={styles.feed__section__date}>
                                    <div className={styles.feed__section__date__divider} />
                                    <div className={styles.feed__section__date__text}>{timestamp}</div>
                                    <div className={styles.feed__section__date__divider} />
                                </div>

                                <div className={styles.feed__section__item}>
                                    <div className={styles.feed__section__item__text}>
                                        <Link href={`/${item.user.slug ? item.user.slug : `/`}`}>
                                            <span className={styles.feed__section__item__text__highlight}>
                                                {item.user.full_name}
                                            </span>
                                        </Link>
                                        <span>
                                            {(item.action_type).toLocaleLowerCase()}
                                        </span>
                                        <Link href={`/${item.user.slug ? item.user.slug : `/`}/${obj.channel.slug}`}>
                                            <span className={styles.feed__section__item__text__highlight}>
                                                {obj.block.title}
                                            </span>
                                        </Link>
                                    </div>
                                    <BlockGrid block={obj.block} />
                                </div>
                            </div>
                        }


                        if (item.action_type === ACTION.CONNECTED) {
                            return <div className={styles.feed__section} key={item.timestamp}>

                                <div className={styles.feed__section__date}>
                                    <div className={styles.feed__section__date__divider} />
                                    <div className={styles.feed__section__date__text}>{timestamp}</div>
                                    <div className={styles.feed__section__date__divider} />
                                </div>

                                <div className={styles.feed__section__item}>
                                    <div className={styles.feed__section__item__text}>
                                        <Link href={`/${item.user.slug ? item.user.slug : `/`}`}>
                                            <span className={styles.feed__section__item__text__highlight}>
                                                {item.user.full_name}
                                            </span>
                                        </Link>
                                        <span>
                                            {(item.action_type).toLocaleLowerCase()} a block to
                                        </span>
                                        <Link href={`/${obj.channel.user?.slug}/${obj.channel.slug}`}>
                                            <span className={styles.feed__section__item__text__highlight}>
                                                {obj.channel.title}
                                            </span>
                                        </Link>
                                    </div>
                                    <BlockGrid block={obj.block} />
                                </div>
                            </div>
                        }
                    }
                })
            }
            {/* <div>{JSON.stringify(feed)}</div> */}
        </div>
    )
}

export default UserFeed;