"use client";
// Packages
import Link from 'next/link';
// Imports
import { IChannel, IUser } from '@/utils/types/types';
import styles from '@/styles/components/search/grid.search.module.scss';
import { timeAgo } from '@/resources/timeAgo';

type IChannelGrid = {
    channel: IChannel
}

const ChannelGrid = ({ channel }: IChannelGrid) => {

    return (
        <div className={styles.block__channel}>
            <Link href={`${channel.user?.slug}/${channel.slug}`}>
                <div className={styles.block__channel__box}>
                    <div className={styles.block__channel__box__title}>{channel.title}</div>
                    <div className={styles.block__channel__box__info}>
                        <span>by {channel.user?.full_name}</span>
                        <span>{timeAgo(channel.date_updated)}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
};

export default ChannelGrid;