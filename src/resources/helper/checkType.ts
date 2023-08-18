import { IUser, IChannel, IUserFollowing, IUserChannelFollowing } from "@/utils/types/types";

// type guard fn to check if props is instance of type
export function isUser(user: any): user is IUser {
    return (user as IUser).full_name !== undefined;
};

export function isChannel(channel: any): channel is IChannel {
    return (channel as IChannel).user !== undefined;
};

export function isUserFollowing(userFollowing: any): userFollowing is IUserFollowing {
    return (userFollowing as IUserFollowing).followed_user !== undefined;
};

export function isUserChannelFollowing(userChaneelFollowing: any): userChaneelFollowing is IUserChannelFollowing {
    return (userChaneelFollowing as IUserChannelFollowing).followed_channel !== undefined;
};