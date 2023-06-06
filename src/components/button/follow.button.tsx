"use client";
// Packages
import useSWRMutation from 'swr/mutation';
// Imports
import { followUser } from "@/resources/data/user/followUser";

/*  User can follow another user or a channel */

const FollowButton = () => {

  return (
    <>
    <div>
        <button onClick={() => console.log('follow!')}>Follow</button>
    </div>
    </>
  )
}

export default FollowButton;