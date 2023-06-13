"use client";
// Packages
// Imports
import { useAppSelector } from '@/store';
import { CheckIfUserFollows } from "@/resources/data/user/checkIfUserFollows";
import FollowUserButton from '@/components/button/user/followUser.button';
import UnfollowUserButton from '@/components/button/user/unfollowUser.button';
import EditChannelButton from '@/components/button/channel/editChannel.button';

interface IHeaderAction {
    channelUser?: any; // user from channel page
    userID?: number;   // user id from user page
}

const HeaderAction = ({ channelUser, userID }: IHeaderAction) => {

    const loggedInUser = useAppSelector((state) => state.User.user);

    const { follow, error, isLoading } = loggedInUser && !channelUser && loggedInUser.id !== userID ? CheckIfUserFollows(userID!)
        : { follow: false, error: undefined, isLoading: false };

    return (
        <>
            {
                loggedInUser && channelUser && channelUser.id == loggedInUser.id ?
                    <EditChannelButton />
                    : loggedInUser && loggedInUser.id !== userID && follow?.status && !error ?
                        <UnfollowUserButton />
                        : loggedInUser && loggedInUser.id !== userID && !follow?.status && !error ?
                            <FollowUserButton />
                            : <div>Nothing</div>
            }
        </>
    )
};

export default HeaderAction;