"use client";
// Packages
import useSWR from "swr";
// Imports
import { useAppSelector } from '@/store';
import FollowButton from "@/components/button/follow.button";
import UnfollowButton from '../button/unfollow.button';
import EditChannelButton from '@/components/button/editChannel.button';
import { CheckIfUserFollows } from "@/resources/data/user/checkIfUserFollows";

interface IHeaderAction {
    channelUser?: any; // user from channel page
    userID?: number;   // user id from user page
    follow_status?: boolean;
}



const HeaderAction = ({ channelUser, userID, follow_status }: IHeaderAction) => {

    const { follow, error, isLoading } = CheckIfUserFollows(userID!);

    const loggedInUser = useAppSelector((state) => state.User.user);

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