"use client";
// Imports
import UnfollowUserButton from "@/components/button/user/unfollowUser.button";
import FollowUserButton from "@/components/button/user/followUser.button";
import { CheckIfUserFollowsUser } from "@/resources/data/user/checkIfUserFollowsUser";

type Props = {
    userID: number;
    loggedInUserID: number | null;
}

const UserFollowMergedButton = ({ userID, loggedInUserID }: Props) => {

    const { followUser, error, mutate, url } = CheckIfUserFollowsUser(userID, loggedInUserID);

    return (
        <>
            {
                followUser?.status ?
                    <UnfollowUserButton userID={userID} mutate={mutate!} url={url!} />
                    :
                    <FollowUserButton userID={userID} mutate={mutate!} url={url!} />
            }
        </>
    )
};

export default UserFollowMergedButton;