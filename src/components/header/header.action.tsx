"use client";
// Packages
// Imports
import { useAppSelector } from '@/store';
import EditChannelButton from '@/components/button/channel/editChannel.button';
import UserFollowMergedButton from '@/components//button/user/userFollowsMergedButton';
import ChannelFollowMergedButton from '../button/channel/channelFollowsMergedButton';

interface IHeaderAction {
    channelUser?: any; // user from channel page
    userID?: number | null | undefined;  // user id from user page
}

// TODO: Fix flicker for follow buttons when componenting is first loaded

const HeaderAction = ({ channelUser, userID }: IHeaderAction) => {

    const loggedInUser = useAppSelector((state) => state.User.user);

    let loggedInUserID: number | null = null;

    if (loggedInUser) loggedInUserID = loggedInUser.id;
    if (!userID) userID = null;

    return (
        <>
            {
                // User logged in + on channel page + channel page user id matches logged in user id
                loggedInUser && channelUser && channelUser.id == loggedInUser.id ?

                    // Display Edit channel button
                    <EditChannelButton />

                    // User logged in + on channel page + channel page user id does NOT match logged in user id
                    : loggedInUser && channelUser && channelUser.id !== loggedInUser.id ?

                        // Display channel follow buttons
                        <ChannelFollowMergedButton channelID={channelUser.id} loggedInUserID={loggedInUserID} />

                        // User logged in + on user page + user page user id does NOT matche logged in user id
                        : loggedInUser && userID && loggedInUser.id !== userID ?

                            // Display user follow buttons
                            <UserFollowMergedButton userID={userID} loggedInUserID={loggedInUserID} />

                            : <div>Nothing</div>
            }
        </>
    )
};

export default HeaderAction;
