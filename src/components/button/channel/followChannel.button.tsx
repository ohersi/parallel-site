"use client";
// Packages
import { KeyedMutator } from 'swr';
import useSWRMutation from 'swr/mutation';
// Imports
import { FollowChannel } from '@/resources/data/channel/followChannel';

type Props = {
    channelID: number;
    mutate: KeyedMutator<any>;
    url: string;
}

const FollowChannelButton = ({ channelID, mutate, url }: Props) => {

    const { trigger, error: error } = useSWRMutation(`api/v1/users/follow/channel/${channelID}`, () => FollowChannel(channelID));

    const handleClick = async () => {
        try {
            await trigger().then((sucess) => {
                if (sucess) {
                  // Rerender HeaderAction component
                  mutate(url)
                }
              })
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