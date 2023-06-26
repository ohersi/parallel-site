"use client";
// Packages
import { useEffect, useRef, useState, MouseEventHandler } from "react";
import useSWR from "swr";
// Imports
import { GetDefaultFeed } from "@/resources/data/feed/getDefaultFeed";
import { IBlock, IChannel } from "@/utils/types/types";
import styles from "@/styles/channel/channel.module.css";
import InfiniteScroll from "react-infinite-scroll-component";

// TODO: Infinite scrolling

const DefaultFeed = () => {
    const fetching = useRef(false);

    const { data: initial, error, isLoading } = useSWR(`api/v1/feed`, () => GetDefaultFeed(channelLastID, blockLastID, 2));

    const [channelLastID, setChannelLastID] = useState<string | null>(null);
    const [blockLastID, setBlockLastID] = useState<string | null>(null);

    const [pages, setPages] = useState<(IChannel & IBlock)[]>([]);

    useEffect(() => {
        if (!isLoading) {
            setChannelLastID(initial ? initial.channel_lastID : null)
            setBlockLastID(initial ? initial.block_lastID : null)
            setPages(initial ? [initial?.data] : [])
        }
    }, [isLoading]);

    const fetchFeed = async () => {
        if (!fetching.current && (channelLastID || blockLastID)) {
            try {
                fetching.current = true;

                const data = await GetDefaultFeed(channelLastID, blockLastID, 2);

                // End of blocks but not for channel; update channels & keep blocks on prev lastID
                if (data.block_lastID == null && data.channel_lastID !== null) {
                    setChannelLastID(data.channel_lastID);
                }
                // End of channels but not for blocks; update blocks & keep channels on prev lastID
                else if (data.channel_lastID == null && data.block_lastID !== null) {
                    setBlockLastID(data.block_lastID);
                }
                // If both come back as null means end of entire list; set state as normal
                else {
                    setChannelLastID(data.channel_lastID);
                    setBlockLastID(data.block_lastID);
                }

                setPages((prev) => [...prev, data.data]);
            }
            finally {
                fetching.current = false;
            }
        }
    }

    if (error) return <div>failed to load</div>
    if (!initial) return <div>loading...</div>;

    const feed = pages.flatMap((page) => page);;

    return (
        <div className={styles.channel_blocks_container}>
            
            <span>Last channelID: {channelLastID ? channelLastID : 'NULL'}</span>
            <span>Last blockID: {blockLastID ? blockLastID : 'NULL'}</span>

            <InfiniteScroll
                dataLength={feed.length}
                next={fetchFeed}
                hasMore={channelLastID || blockLastID ? true : false}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {
                    feed.map((item, index) => {
                        if (item.source_url) {
                            // TODO: Replace index with block slug 
                            return <div key={index} className={styles.channel_blocks}>
                                <span>{item.title}</span>
                                <span>{item.id}</span>
                                <div>{item?.description}</div>
                                <span>{item?.source_url}</span>
                            </div>
                        }
                        return <div key={item.slug} className={styles.channel_blocks}>
                            <span>{item.slug}</span>
                            <div>{item?.description}</div>
                        </div>
                    })
                }
            </InfiniteScroll>

            {/* <div>{JSON.stringify(feed)}</div> */}
        </div>
    )
};

export default DefaultFeed;