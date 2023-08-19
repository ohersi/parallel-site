"use client";
// Imports
import { useAppSelector } from '@/store';
import EditChannelButton from '@/components/button/channel/editChannel.button';
import UserFollowMergedButton from '@/components/button/user/userFollowsMerged.button';
import ChannelFollowMergedButton from '@/components/button/channel/channelFollowsMerged.button';
import CreateChannelButton from '@/components/button/channel/createChannel.button';
import { IChannel } from '@/utils/types/types';

interface IHeaderAction {
    channelUser?: any; // user from channel page
    channel?: IChannel;
    userID?: number | null | undefined;  // user id from user page
}

const HeaderAction = ({ channelUser, channel, userID }: IHeaderAction) => {

    const loggedInUser = useAppSelector((state) => state.User.user);

    let loggedInUserID: number | null = null;

    if (loggedInUser && loggedInUser.id !== undefined) loggedInUserID = loggedInUser.id;
    if (!userID) userID = null;

    return (
        <>
            {
                loggedInUser && channelUser && channel && channelUser.id == loggedInUser.id ?

                    <EditChannelButton />

                    : loggedInUser && channelUser && channel && channelUser.id !== loggedInUser.id ?

                        <ChannelFollowMergedButton channelID={channel.id} loggedInUserID={loggedInUserID} />

                        : loggedInUser && userID && loggedInUser.id !== userID ?

                            <UserFollowMergedButton userID={userID} loggedInUserID={loggedInUserID} />

                            : loggedInUser && userID && loggedInUser.id == userID ?

                                <CreateChannelButton userID={userID} />
                                
                                : null
            }
        </>
    )
};

export default HeaderAction;
