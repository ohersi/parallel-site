"use client";
// Packages
import { KeyedMutator } from 'swr';
import useSWRMutation from 'swr/mutation';
// Imports
import { UnfollowUser } from '@/resources/data/user/unfollowUser';
import styles from '@/styles/components/button.module.scss';

interface IUnfollowUserButton {
  userID: number;
  mutate: KeyedMutator<any>;
  url: string;
}

const UnfollowUserButton = ({ userID, mutate, url }: IUnfollowUserButton) => {

  const { trigger, error: error } = useSWRMutation(`api/v1/users/unfollow/user/${userID}`, () => UnfollowUser(userID));

  const handleClick = async () => {
    await trigger()
      .then((res) => {
        // Rerender HeaderAction component
        if (res?.success) mutate(url);
      })
      .catch((error: any) => console.log(error));
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      unfollow
    </button>
  )
}

export default UnfollowUserButton;