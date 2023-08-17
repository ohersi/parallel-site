"use client";
// Packages
import { useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// Imports
import { useAppSelector } from "@/store";
import BlockGrid from "@/components/block/grid.blocks";
import Loader from '@/components/loader/loader';
import CreateBlockButton from "@/components/button/block/createBlock.button";
import { IBlock, IPageResults } from "@/utils/types/types";
import styles from "@/styles/components/channel.module.scss";

type PageResults = {
    initial: IPageResults;
}

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
        <InfiniteScroll
            dataLength={blocks.length}
            next={fetchBlocks}
            className={styles.channel}
            hasMore={lastID ? true : false}
            loader={<Loader />}
        >
            {
                loggedInUser && loggedInUser.id == channel.user?.id ?
                    <CreateBlockButton />
                    : null
            }
            
            {
                blocks.map((block: IBlock) => (
                    <BlockGrid
                        block={block}
                        channelID={channel.id}
                        channelUser={channel.user?.full_name}
                        channelTitle={channel.title}
                        key={block.id}
                    />
                ))
            }
{/* 
            <div className={styles.default_block}>
                TEST
            </div>
            <div className={styles.default_block}>
                TEST
            </div>
            <div className={styles.default_block}>
                TEST
            </div>
            <div className={styles.default_block}>
                TEST
            </div>
            <div className={styles.default_block}>
                TEST
            </div>
            <div className={styles.default_block}>
                TEST
            </div>
            <div className={styles.default_block}>
                TEST
            </div>
            <div className={styles.default_block}>
                TEST
            </div> */}
        </InfiniteScroll>
    )
};

export default Channel;