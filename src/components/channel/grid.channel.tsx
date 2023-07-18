"use client";
// Packages
import Link from 'next/link';
// Imports
import { IChannel, IUser } from '@/utils/types/types';
import styles from '@/styles/components/search/grid.search.module.scss';
import { timeAgo } from '@/resources/timeAgo';

interface IChannelGrid {
    props: {
        channel: IChannel,
        user: IUser
    }
}

const ChannelGrid = ({ props: { channel, user } }: IChannelGrid) => {

    return (
        <Link href={`${user.slug}/${channel.slug}`}>
            <div className={styles.channel_block}>
                <div className={styles.channel_block__title}>{channel.title}</div>

                <div className={styles.channel_block__info}>
                <span>by {user.full_name}</span>
                    <span>{timeAgo(channel.date_updated)}</span>
                </div>
            </div>
        </Link>
    )
};

export default ChannelGrid;