"use client";
// Packages
import { useEffect } from 'react';
import Link from 'next/link';
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import { setViewType } from '@/store/filterTypeSlice';
import BlockGrid from '@/components/block/grid.blocks';
import { IUser, IChannel, IBlock, FEED, SORT } from '@/utils/types/types';
import { timeAgo } from '@/resources/timeAgo';
import styles from "@/styles/components/user.module.scss";

type Data = {
    channel: IChannel;
    blocks: IBlock[];
    total_blocks: number;
}

interface IUserProps {
    user: IUser;
    userChannels: any;
    userBlocks: IBlock[] | null;
}

const User = ({ user, userChannels, userBlocks }: IUserProps) => {

    const dispatch = useAppDispatch();
    const viewType = useAppSelector((state) => state.Filter.viewType);
    const sortType = useAppSelector((state) => state.Filter.sortType);

    useEffect(() => { dispatch(setViewType(FEED.CHANNEL)) }, []);

    return (
        <div className={styles.grid}>
            {
                userChannels && viewType == FEED.CHANNEL ?
                    <div className={styles.grid__box}>
                        {
                            sortType == SORT.RECENTLY_UPDATED ?
                                userChannels.map((data: Data) => (
                                    <div
                                        className={styles.grid__box__row}
                                        key={data.channel.id}
                                    >

                                        <div className={styles.grid__box__row__text}>
                                            <div className={styles.grid__box__row__text__title}>
                                                <Link href={`/${user.slug}/${data.channel.slug}`}>
                                                    {data.channel.title}
                                                </Link>
                                            </div>
                                            <div className={styles.grid__box__row__text__info}>
                                                <Link href={`/${user.slug}/${data.channel.slug}`}>
                                                    by {user.full_name}
                                                    &nbsp; • &nbsp;
                                                    {timeAgo(data.channel.date_created)}
                                                </Link>
                                            </div>
                                        </div>
                                        {
                                            data.blocks.length ?
                                                <div className={styles.grid__box__row__item}>
                                                    {
                                                        data.blocks.map((block: IBlock) => (
                                                            <BlockGrid
                                                                block={block}
                                                                channelID={data.channel.id}
                                                                channelUser={user.full_name}
                                                                channelTitle={data.channel.title}
                                                                key={block.id} />
                                                        ))
                                                    }
                                                </div>
                                                : null
                                        }
                                        {
                                            data.total_blocks ?
                                                <div className={styles.grid__box__row__info}>
                                                    <span>+{data.total_blocks} more blocks</span>
                                                </div>
                                                : null
                                        }
                                    </div>
                                ))
                                :
                                sortType == SORT.OLDEST ?
                                    userChannels.slice().reverse().map((data: Data) => (
                                        <div
                                            className={styles.grid__box__row}
                                            key={data.channel.id}
                                        >

                                            <div className={styles.grid__box__row__text}>
                                                <div className={styles.grid__box__row__text__title}>
                                                    <Link href={`/${user.slug}/${data.channel.slug}`}>
                                                        {data.channel.title}
                                                    </Link>
                                                </div>
                                                <div className={styles.grid__box__row__text__info}>
                                                    <Link href={`/${user.slug}/${data.channel.slug}`}>
                                                        by {user.full_name}
                                                        &nbsp; • &nbsp;
                                                        {timeAgo(data.channel.date_created)}
                                                    </Link>
                                                </div>
                                            </div>
                                            {
                                                data.blocks.length ?
                                                    <div className={styles.grid__box__row__item}>
                                                        {
                                                            data.blocks.map((block: IBlock) => (
                                                                <BlockGrid
                                                                    block={block}
                                                                    channelID={data.channel.id}
                                                                    channelUser={user.full_name}
                                                                    channelTitle={data.channel.title}
                                                                    key={block.id} />
                                                            ))
                                                        }
                                                    </div>
                                                    : null
                                            }
                                            {
                                                data.total_blocks ?
                                                    <div className={styles.grid__box__row__info}>
                                                        <span>+{data.total_blocks} more blocks</span>
                                                    </div>
                                                    : null
                                            }
                                        </div>
                                    ))
                                    : null
                        }
                    </div>
                    :
                    userBlocks && viewType == FEED.BLOCK ?
                        <div className={styles.grid__grid}>
                            {
                                sortType == SORT.RECENTLY_UPDATED ?
                                    userBlocks.map((block: IBlock) => (
                                        <BlockGrid
                                            block={block}
                                            channelUser={user.full_name}
                                            key={block.id} />
                                    ))
                                    : sortType == SORT.OLDEST ?
                                        userBlocks.slice().reverse().map((block: IBlock) => (
                                            <BlockGrid
                                                block={block}
                                                channelUser={user.full_name}
                                                key={block.id} />
                                        ))
                                        : null
                            }
                        </div>
                        : null
            }
        </div>
    )
}

export default User;