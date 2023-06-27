"use client";
// Packages
import useSWR from "swr";
// Imports
import { useAppSelector } from "@/store";
import { timeAgo } from "@/resources/timeAgo";
import { GetUserFeed } from "@/resources/data/user/getUserFeed";
import { FEED, IBlock, IChannel, IUser } from "@/utils/types/types";

const UserFeed = () => {

    const loggedInUser: IUser = useAppSelector((state) => state.User.user);

    const { data, error } = useSWR(`api/v1/${loggedInUser.id}/feed`, () => GetUserFeed(loggedInUser.id));

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>;

    const feed = data.flat();

    return (
        <>
            {
                feed.map((item) => {
                    // Can follow user
                    if (item.data_type === FEED.USER) {
                        const user = item.data as IUser;
                        let timestamp = timeAgo(item.timestamp);
                        return <div key={user.id}>
                            <span>{item.full_name} {(item.action_type).toLocaleLowerCase()} {(item.data_type).toLocaleLowerCase()}: {user.full_name}</span>
                            <span>{timestamp}</span>
                        </div>
                    }
                    if (item.data_type === FEED.CHANNEL) {
                        // Can follow / create channel
                        const channel = item.data as IChannel;
                        let timestamp = timeAgo(item.timestamp);
                        return <div key={channel.id}>
                            <span>{item.full_name} {(item.action_type).toLocaleLowerCase()} {(item.data_type).toLocaleLowerCase()} {channel.slug}</span>
                            <span>{timestamp}</span>
                        </div>
                    }
                    if (item.data_type === FEED.BLOCK) {
                        // Can connect block
                        const block = item.data as IBlock;
                        let timestamp = timeAgo(item.timestamp);
                        return <div key={block.id}>
                            <span>{item.full_name} {(item.action_type).toLocaleLowerCase()} {(item.data_type).toLocaleLowerCase()} {block.title}</span>
                            <span>{timestamp}</span>
                        </div>
                    }
                })
            }
            <div>{JSON.stringify(feed)}</div>
        </>
    )
}

export default UserFeed;