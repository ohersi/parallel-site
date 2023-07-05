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
        <button onClick={handleClick}>Unfollow</button>
      </div>
    </>
  )
}

export default UnfollowUserButton;