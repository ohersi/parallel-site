"use client";
// Packages
import useSWRMutation from 'swr/mutation';
// Imports
import { followUser } from "@/resources/data/user/followUser";

/*  User can follow another user or a channel */

const FollowUserButton = () => {

  return (
    <>
    <div>
        <button onClick={() => console.log('follow user!')}>Follow</button>
    </div>
    </>
  )
}

export default FollowUserButton;