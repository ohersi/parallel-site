"use client";
// Packages
import useSWRMutation from 'swr/mutation';
// Imports
import { UnfollowChannel } from '@/resources/data/channel/unfollowChannel';

type Props = {
    channelID: number;
}

const UnfollowChannelButton = ({ channelID }: Props) => {

    const { trigger, error: error } = useSWRMutation(`api/v1/users/unfollow/channel/${channelID}`, () => UnfollowChannel(channelID));

    const handleClick = async () => {
        try {
            await trigger();
        }
        catch (error: any) {
            // TODO: Setup error handling
            console.log(error);
        }
    };

    return (
        <>
            <div>
                <button onClick={() => handleClick}>Follow</button>
            </div>
        </>
    )
}

export default UnfollowChannelButton;