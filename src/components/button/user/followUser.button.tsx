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
    <>
      <div className={styles.button}>
        <button onClick={handleClick}>Follow</button>
      </div>
    </>
  )
};

export default FollowUserButton;