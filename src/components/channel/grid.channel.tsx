"use client";
// Packages
import Link from 'next/link';
// Imports
import { IChannel, IUser } from '@/utils/types/types';

interface IChannelGrid {
    props: {
        channel: IChannel,
        user: IUser
    }
}

const ChannelGrid = ({ props: { channel, user } }: IChannelGrid) => {

    return (
        <>
            <Link href={`${user.slug}/${channel.slug}`}>
                <div>
                    <h4>{channel.title}</h4>
                    <span>by {user.full_name}</span>
                </div>
            </Link>

        </>
    )
};

export default ChannelGrid;