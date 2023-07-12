"use client";
// Packages
import { KeyedMutator } from 'swr';
import useSWRMutation from 'swr/mutation';
// Imports
import { UnfollowChannel } from '@/resources/data/channel/unfollowChannel';
import styles from '@/styles/components/button.module.scss';

type Props = {
    channelID: number;
    mutate: KeyedMutator<any>;
    url: string;
}

const UnfollowChannelButton = ({ channelID, mutate, url }: Props) => {

    const { trigger, error: error } = useSWRMutation(`api/v1/users/unfollow/channel/${channelID}`, () => UnfollowChannel(channelID));

    const handleClick = async () => {
        try {
            await trigger().then((success) => {
                if (success) {
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
        <button className={styles.button} onClick={() => handleClick}>
            Follow
        </button>
    )
}

export default UnfollowChannelButton;