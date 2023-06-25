"use client";
// Packages
import useSWR from "swr";
// Imports
import { GetDefaultFeed } from "@/resources/data/feed/getDefaultFeed";
import { IBlock, IChannel } from "@/utils/types/types";
import styles from "@/styles/channel/channel.module.css";

type FeedItems = IChannel & IBlock;

// TODO: Infinite scrolling

const DefaultFeed = () => {

    const { data, error } = useSWR(`feed`, GetDefaultFeed);

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>;

    const feed = data;

    return (
        <div className={styles.channel_blocks_container}>
            {
                feed.map((item: FeedItems) => {
                    if (item?.source_url) {
                        return <div key={item.slug} className={styles.channel_blocks}>
                            <span>{item?.title}</span>
                            <div>{item?.description}</div>
                            <span>{item?.source_url}</span>
                        </div>
                    }
                    return <div key={item.slug} className={styles.channel_blocks}>
                        <span>{item?.title}</span>
                        <div>{item?.description}</div>
                    </div>
                })
            }
        </div>
    )
};

export default DefaultFeed;