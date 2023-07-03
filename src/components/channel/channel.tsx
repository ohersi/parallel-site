"use client";
// Packages
import { useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// Imports
import { useAppSelector } from "@/store";
import BlockGrid from "@/components/block/grid.blocks";
import CreateBlockButton from "@/components/button/block/createBlock.button";
import { IBlock, IPageResults } from "@/utils/types/types";
import styles from "@/styles/components/channel.module.scss";

type PageResults = {
    initial: IPageResults;
}

// TODO: Replace InfiniteScroll packages with custom scroll

const Channel = ({ initial }: PageResults) => {

    const loggedInUser = useAppSelector((state) => state.User.user);

    const fetching = useRef(false);

    const [pages, setPages] = useState([initial.data.blocks]);
    const [lastID, setLastID] = useState(initial.last_id);

    const channel = initial.data;
    const blocks = pages.flatMap((page) => page);

    const fetchBlocks = async () => {
        
        if (!fetching.current && lastID) {

            console.log('fetching more blocks');

            try {
                fetching.current = true;

                const response = await fetch(
                    `http://localhost:3000/api/v1/channels/title/${channel.slug}?last_id=${lastID}&limit=2`
                );
                const data = await response.json() as IPageResults;

                setLastID(data.last_id);

                setPages((prev) => [...prev, data.data.blocks]);

            } finally {
                fetching.current = false;
            }
        }
    };

    return (
        <div className={styles.channel_blocks_container}>
            {
                loggedInUser && loggedInUser.id == channel.user?.id ?
                <CreateBlockButton />
                : null
            }

            <InfiniteScroll
                dataLength={blocks.length}
                next={fetchBlocks}
                hasMore={lastID ? true : false}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {
                    blocks.map((block: IBlock) => (
                        <BlockGrid block={block} channelID={channel.id} key={block.id} />
                    ))
                }
            </InfiniteScroll>
        </div>
    )
};

export default Channel;