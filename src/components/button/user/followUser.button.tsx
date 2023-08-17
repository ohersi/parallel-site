"use client";
// Packages
import { KeyedMutator } from 'swr';
import useSWRMutation from 'swr/mutation';
// Imports
import { FollowUser } from "@/resources/data/user/followUser";
import styles from '@/styles/components/button.module.scss';

interface IFollowUserButton {
  userID: number;
  mutate: KeyedMutator<any>;
  url: string;
}

const FollowUserButton = ({ userID, mutate, url }: IFollowUserButton) => {

  const { trigger, error: error } = useSWRMutation(`api/v1/users/follow/user/${userID}`, () => FollowUser(userID));

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
      follow
    </button>
  )
};

export default FollowUserButton;