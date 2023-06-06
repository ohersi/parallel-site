"use client";
// Packages
import useSWRMutation from 'swr/mutation';
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