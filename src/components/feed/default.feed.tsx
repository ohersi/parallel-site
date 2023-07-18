"use client";
// Packages
import { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// Imports
import { useAppSelector } from "@/store";
import BlockGrid from "@/components/block/grid.blocks";
import ChannelGrid from "@/components/channel/grid.channel";
import { GetDefaultFeed } from "@/resources/data/feed/getDefaultFeed";
import { IBlock, IChannel, IDefaultFeedResults, FEED, SORT } from "@/utils/types/types";
import styles from "@/styles/components/feed/default.feed.module.scss";

// TODO: Replace InfiniteScroll packages with custom scroll

interface IDefaultFeed {
    initial: IDefaultFeedResults;
}

const DefaultFeed = ({ initial }: IDefaultFeed) => {

    const fetching = useRef(false);
    const viewType = useAppSelector((state) => state.Filter.viewType);
    const sortType = useAppSelector((state) => state.Filter.sortType);

    const [channelLastID, setChannelLastID] = useState(initial.channel_lastID);
    const [blockLastID, setBlockLastID] = useState<string | null>(initial.block_lastID);
    const [pages, setPages] = useState<(IChannel & IBlock)[]>([initial.data]);

    const feed = pages.flatMap((page) => page);

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
    };

    return (
        <div className={styles.feed}>

            <span>Last channelID: {channelLastID ? channelLastID : 'NULL'}</span>
            <span>Last blockID: {blockLastID ? blockLastID : 'NULL'}</span>

            <span>
                <button onClick={fetchFeed}>Get More</button>
            </span>

            <div className={styles.feed__grid}>
                {
                    feed && viewType == FEED.ALL ?
                        <div className={styles.feed__grid__box}>
                            {
                                sortType == SORT.RECENTLY_UPDATED ?
                                    feed.map((item: any, index) => {
                                        if (item.source_url) {
                                            // TODO: Replace index with block slug 
                                            return <BlockGrid block={item} key={index} />

                                        }
                                        return <ChannelGrid channel={item} key={item.slug} />
                                    })
                                    : sortType == SORT.OLDEST ?
                                        feed.slice().reverse().map((item: any, index) => {
                                            if (item.source_url) {
                                                // TODO: Replace index with block slug 
                                                return <BlockGrid block={item} key={index} />

                                            }
                                            return <ChannelGrid channel={item} key={item.slug} />
                                        })
                                        : null
                            }
                        </div>
                        :
                        feed && viewType == FEED.CHANNEL ?
                            <div className={styles.feed__grid__box}>
                                {
                                    sortType == SORT.RECENTLY_UPDATED ?
                                        feed.map((item: any) => {
                                            if (!item.source_url)
                                                return <ChannelGrid channel={item} key={item.slug} />
                                        })
                                        : sortType == SORT.OLDEST ?
                                            feed.slice().reverse().map((item: any) => {
                                                if (!item.source_url)
                                                    return <ChannelGrid channel={item} key={item.slug} />
                                            })
                                            : null
                                }
                            </div>
                            :
                            feed && viewType == FEED.BLOCK ?
                                <div className={styles.feed__grid__box}>
                                    {
                                        sortType == SORT.RECENTLY_UPDATED ?
                                            feed.map((item: any, index) => {
                                                if (item.source_url)
                                                    return <BlockGrid block={item} key={index} />
                                            })
                                            : sortType == SORT.OLDEST ?
                                                feed.slice().reverse().map((item: any, index) => {
                                                    if (item.source_url)
                                                        return <BlockGrid block={item} key={index} />
                                                })
                                                : null
                                    }
                                </div>
                                : null
                }
            </div>
        </div>
    )
};

export default DefaultFeed;