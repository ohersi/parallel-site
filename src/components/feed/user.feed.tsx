"use client";
// Packages
import Link from "next/link";
import useSWR from "swr";
// REDUX
import { useAppSelector } from "@/store";
// COMPONENTS
import UserGrid from "@/components/user/grid.user";
import ChannelGrid from "@/components/channel/grid.channel";
import BlockGrid from "@/components/block/grid.blocks";
import Loader from "@/components/loader/loader";
// FUNCTIONS
import { GetUserFeed } from "@/resources/data/user/getUserFeed";
import { timeAgo } from "@/resources/timeAgo";
// TYPES
import { ICombinedObj, FEED, ACTION, IChannel, IUser } from "@/utils/types/types";
// STYLES
import styles from "@/styles/components/feed/user.feed.module.scss";

const UserFeed = () => {

    const loggedInUser = useAppSelector((state) => state.User.user);
    const { data, error, isLoading } = useSWR(`api/v1/feed`, () => loggedInUser.id ? GetUserFeed(loggedInUser.id) : null);

    if (error) return <div className={styles.feed__error}><span>Error!</span><span>Refresh Page</span></div>
    if (isLoading) return <div className={styles.feed__loading}><Loader /></div>
    if (!data) return <div className={styles.feed__empty}>No activity</div>;

    const feed = Array.isArray(data) && data.length ? data?.flat() : null;

    return (
        <div className={styles.feed}>
            {
                feed ?
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
                                        <span className={styles.feed__section__item__text__highlight}>
                                            <Link href={`/${item.user.slug ? item.user.slug : `/`}`}>
                                                {item.user.full_name}&nbsp;
                                            </Link>
                                        </span>
                                        <span className={styles.feed__section__item__text__default}>
                                            {(item.action_type).toLocaleLowerCase()}&nbsp;
                                        </span>
                                        <span className={styles.feed__section__item__text__highlight}>
                                            <Link href={`/${user.slug}`}>
                                                {user.full_name}
                                            </Link>
                                        </span>
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
                                        <span className={styles.feed__section__item__text__highlight}>
                                            <Link href={`/${item.user.slug ? item.user.slug : `/`}`}>
                                                {item.user.full_name}&nbsp;
                                            </Link>
                                        </span>
                                        <span className={styles.feed__section__item__text__default}>
                                            {(item.action_type).toLocaleLowerCase()}&nbsp;
                                        </span>
                                        <span className={styles.feed__section__item__text__highlight}>
                                            <Link href={`/${channel.user?.slug}/${channel.slug}`}>
                                                {channel.title}
                                            </Link>
                                        </span>
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
                                            <span className={styles.feed__section__item__text__highlight}>
                                                <Link href={`/${item.user.slug ? item.user.slug : `/`}`}>
                                                    {item.user.full_name}&nbsp;
                                                </Link>
                                            </span>
                                            <span className={styles.feed__section__item__text__default}>
                                                {(item.action_type).toLocaleLowerCase()}&nbsp;
                                            </span>
                                            <span className={styles.feed__section__item__text__highlight}>
                                                <Link href={`/${item.user.slug ? item.user.slug : `/`}/${obj.channel.slug}`}>
                                                    {obj.block.title}
                                                </Link>
                                            </span>
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
                                            <span className={styles.feed__section__item__text__highlight}>
                                                <Link href={`/${item.user.slug ? item.user.slug : `/`}`}>
                                                    {item.user.full_name}&nbsp;
                                                </Link>
                                            </span>
                                            <span className={styles.feed__section__item__text__default}>
                                                {(item.action_type).toLocaleLowerCase()} a block to&nbsp;
                                            </span>
                                            <span className={styles.feed__section__item__text__highlight}>
                                                <Link href={`/${obj.channel.user?.slug}/${obj.channel.slug}`}>
                                                    {obj.channel.title}
                                                </Link>
                                            </span>
                                        </div>
                                        <BlockGrid block={obj.block} />
                                    </div>
                                </div>
                            }
                        }
                    })
                    : null
            }
        </div>
    )
}

export default UserFeed;