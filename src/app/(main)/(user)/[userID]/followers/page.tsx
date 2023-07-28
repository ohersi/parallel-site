import { getUserFollowers } from "@/resources/data/user/getUserFollowers"
import { IPageProps } from "@/utils/types/types";

const UserFollowersPage = async ({ params }: IPageProps) => {
  
  const res = await getUserFollowers(params.userID);
  
  return (
    <>
      <div>User Followers Page</div>
      <div>{JSON.stringify(res)}</div>
    </>
  )
};

export default UserFollowersPage;