"use client";
// Packages
import useSWRMutation from 'swr/mutation';
import { UnfollowUser } from '@/resources/data/user/unfollowUser';

// Imports

/*  User can unfollow another user or a channel */

const UnfollowButton = () => {

  return (
    <>
    <div>
        <button onClick={() => console.log('unfollow button pressed')}>Unfollow</button>
    </div>
    </>
  )
}

export default UnfollowButton;