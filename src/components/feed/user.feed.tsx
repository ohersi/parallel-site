"use client";
// Packages
import useSWR from "swr";
// Imports
import { useAppSelector } from "@/store";
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
                    if (item.data_type === FEED.USER) {
                        const user = item.data as IUser;
                        return <div key={user.id}>
                            <span>{item.full_name} {item.action_type} {item.data_type} {user.full_name}</span>
                        </div>
                    }
                    if (item.data_type === FEED.CHANNEL) {
                        const channel = item.data as IChannel;
                        return <div key={channel.id}>
                            <span>{item.full_name} {item.action_type} {item.data_type} {channel.slug}</span>
                        </div>
                    }
                    if (item.data_type === FEED.BLOCK) {
                        const block = item.data as IBlock;
                        return <div key={block.id}>
                            <span>{item.full_name} {item.action_type} {item.data_type} {block.title}</span>
                        </div>
                    }
                })
            }
            <div>{JSON.stringify(feed)}</div>
        </>
    )
}

export default UserFeed;