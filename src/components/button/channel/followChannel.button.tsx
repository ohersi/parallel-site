"use client";
// Packages
import useSWRMutation from 'swr/mutation';
// Imports
import { FollowChannel } from '@/resources/data/channel/followChannel';

type Props = {
    channelID: number;
}

const FollowChannelButton = ({ channelID }: Props) => {

    const { trigger, error: error } = useSWRMutation(`api/v1/users/follow/channel/${channelID}`, () => FollowChannel(channelID));

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

export default FollowChannelButton;