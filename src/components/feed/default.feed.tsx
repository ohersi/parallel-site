"use client";
// Packages
import { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// Imports
import { GetDefaultFeed } from "@/resources/data/feed/getDefaultFeed";
import { IBlock, IChannel, IDefaultFeedResults } from "@/utils/types/types";
import styles from "@/styles/components/channel.module.scss";

// TODO: Replace InfiniteScroll packages with custom scroll

interface IDefaultFeed {
    initial: IDefaultFeedResults;
}

const DefaultFeed = ({ initial }: IDefaultFeed) => {

    const fetching = useRef(false);

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