"use client";
// Packages
import { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// Imports
import { useAppSelector } from "@/store";
import BlockGrid from "@/components/block/grid.blocks";
import ChannelGrid from "@/components/channel/grid.channel";
import Loader from '@/components/loader/loader';
import { GetDefaultFeed } from "@/resources/data/feed/getDefaultFeed";
import { IBlock, IChannel, IDefaultFeedResults, FEED, SORT } from "@/utils/types/types";
import styles from "@/styles/components/feed/default.feed.module.scss";

interface IDefaultFeed {
    initial: IDefaultFeedResults;
}

const DefaultFeed = ({ initial }: IDefaultFeed) => {

    const fetching = useRef(false);
    const viewType = useAppSelector((state) => state.Filter.viewType);
    const sortType = useAppSelector((state) => state.Filter.sortType);

    const [channelLastID, setChannelLastID] = useState(initial.channel_lastID);
    const [blockLastID, setBlockLastID] = useState<string | null>(initial.block_lastID);
    const [pages, setPages] = useState<Array<IChannel & IBlock>>(initial.data);
    const [onInitialData, setOnInitialData] = useState(true);

    const res = pages.flatMap((page) => page);

    const fetchFeed = async () => {

        onInitialData == true ? setOnInitialData(false) : null;

        if (!fetching.current && (channelLastID || blockLastID)) {
            try {
                fetching.current = true;

                const data = await GetDefaultFeed(channelLastID, blockLastID, 2);

                if (!data) return;

                setChannelLastID(data.channel_lastID);
                setBlockLastID(data.block_lastID);
                setPages((prev) => [...prev, ...data.data]);
            }
            finally {
                fetching.current = false;
            }
        }
    };
    
    // Sort new feed items into old batch
    let feed = onInitialData ? res : res.sort((n1, n2) => {
        if (n1.date_updated > n2.date_updated) {
            return -1;
        }
        if (n1.date_updated < n2.date_updated) {
            return 1;
        }
        return 0;
    });

    return (
        <div className={styles.feed}>
            <InfiniteScroll
                dataLength={feed.length}
                next={fetchFeed}
                className={styles.feed__grid}
                hasMore={channelLastID || blockLastID ? true : false}
                loader={<Loader />}
            >
                {
                    feed && viewType == FEED.ALL ?
                        <div className={styles.feed__grid__box}>
                            {
                                sortType == SORT.RECENTLY_UPDATED ?
                                    feed.map((item: any) => {
                                        if (item.source_url) {
                                            return <BlockGrid block={item} key={item.unique_id} />
                                        }
                                        return <ChannelGrid channel={item} key={item.slug} />
                                    })
                                    : sortType == SORT.OLDEST ?
                                        feed.slice().reverse().map((item: any) => {
                                            if (item.source_url) {
                                                return <BlockGrid block={item} key={item.unique_id} />

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
                                            feed.map((item: IBlock) => {
                                                if (item.source_url)
                                                    return <BlockGrid block={item} key={item.unique_id} />
                                            })
                                            : sortType == SORT.OLDEST ?
                                                feed.slice().reverse().map
                                                    ((item: IBlock) => {
                                                        if (item.source_url)
                                                            return <BlockGrid block={item} key={item.unique_id} />
                                                    })
                                                : null
                                    }
                                </div>
                                : null
                }
            </InfiniteScroll>
        </div>
    )
};

export default DefaultFeed;