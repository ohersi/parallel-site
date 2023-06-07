"use client";
// Packages
// Imports
import { useAppSelector } from '@/store';
import { CheckIfUserFollows } from "@/resources/data/user/checkIfUserFollows";
import FollowButton from "@/components/button/follow.button";
import UnfollowButton from '@/components/button/unfollow.button';
import EditChannelButton from '@/components/button/editChannel.button';

interface IHeaderAction {
    channelUser?: any; // user from channel page
    userID?: number;   // user id from user page
}

const HeaderAction = ({ channelUser, userID }: IHeaderAction) => {

    const loggedInUser = useAppSelector((state) => state.User.user);

    const { follow, error, isLoading } = loggedInUser ? CheckIfUserFollows(userID!)
        : { follow: false, error: undefined, isLoading: false };

    return (
        <>
            {
                loggedInUser && channelUser && channelUser.id == loggedInUser.id ?
                    <EditChannelButton />
                    : loggedInUser && loggedInUser.id !== userID && follow?.status && !error ?
                        <UnfollowButton />
                        : loggedInUser && loggedInUser.id !== userID && !follow?.status && !error ?
                            <FollowButton />
                            : <div>Nothing</div>
            }
        </>
    )
};

export default HeaderAction;