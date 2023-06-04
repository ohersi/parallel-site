import { getUserFollowing } from "@/resources/data/user/getUserFollowing";
import { IPageProps } from "@/utils/types/types";

const UserFollowingPage = async ({ params }: IPageProps) => {

    const res = await getUserFollowing(params.userID);

    return (
        <>
            <div>User Following Page</div>
            <div>{JSON.stringify(res)}</div>
        </>
    )
};

export default UserFollowingPage;