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
        await trigger()
            .then((res) => {
                // Rerender HeaderAction component
                if (res?.success) mutate(url);
            })
            .catch((error: any) => console.log(error));
    }

    return (
        <button className={styles.button} onClick={handleClick}>
            unfollow
        </button>
    )
};

export default UnfollowChannelButton;