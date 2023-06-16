"use client";
// Imports
import FollowChannelButton from "@/components/button/channel/followChannel.button";
import UnfollowChannelButton from "@/components/button/channel/unfollowChannel.button";
import { CheckIfUserFollowsChannel } from "@/resources/data/user/checkIfUserFollowsChannel";

type Props = {
    channelID: number;
    loggedInUserID: number | null;
}

const ChannelFollowMergedButton = ({ channelID, loggedInUserID }: Props) => {

    const { followChannel, error, mutate, url } = CheckIfUserFollowsChannel(channelID, loggedInUserID);
    console.log(`followChannel: ${JSON.stringify(followChannel)}`);

    return (
        <>
            {
                followChannel?.status ?
                    <UnfollowChannelButton channelID={channelID} mutate={mutate!} url={url!} />
                    :
                    <FollowChannelButton channelID={channelID} mutate={mutate!} url={url!} />
            }
        </>
    )
};

export default ChannelFollowMergedButton;