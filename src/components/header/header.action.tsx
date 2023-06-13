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

// TODO: Fix flicker for follow buttons when componenting is first loaded
// TODO: Error -Rendered fewer hooks than expected. This may be caused by an accidental early return statement.

const HeaderAction = ({ channelUser, userID }: IHeaderAction) => {

    const loggedInUser = useAppSelector((state) => state.User.user);

    const { follow, error, mutate, url} = loggedInUser && !channelUser && loggedInUser.id !== userID ? CheckIfUserFollows(userID!)
        : { follow: false, error: undefined, mutate: undefined, url: undefined };

    return (
        <>
            {
                loggedInUser && channelUser && channelUser.id == loggedInUser.id ?
                    <EditChannelButton />
                    : loggedInUser && loggedInUser.id !== userID && follow?.status && userID && !error ?
                        <UnfollowUserButton userID={userID} mutate={mutate!} url={url!}/>
                        : loggedInUser && loggedInUser.id !== userID && !follow?.status && userID && !error ?
                            <FollowUserButton userID={userID} mutate={mutate!} url={url!}/>
                            : <div>Nothing</div>
            }
        </>
    )
};

export default HeaderAction;