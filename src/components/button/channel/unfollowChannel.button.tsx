"use client";
// Packages
import { KeyedMutator } from 'swr';
import useSWRMutation from 'swr/mutation';
// Imports
import { UnfollowChannel } from '@/resources/data/channel/unfollowChannel';

type Props = {
    channelID: number;
    mutate: KeyedMutator<any>;
    url: string;
}

const UnfollowChannelButton = ({ channelID, mutate, url }: Props) => {

    const { trigger, error: error } = useSWRMutation(`api/v1/users/unfollow/channel/${channelID}`, () => UnfollowChannel(channelID));

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

export default UnfollowChannelButton;