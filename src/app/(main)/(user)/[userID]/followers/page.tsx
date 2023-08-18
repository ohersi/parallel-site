// Packages
import { Metadata } from "next";
import { notFound } from "next/navigation";
// COMPONENTS
import Header from '@/components/header/header';
import HeaderTitle from '@/components/header/title.header';
import HeaderInfo from '@/components/header/info.header';
import HeaderAction from '@/components/header/header.action';
import UserGrid from '@/components/user/grid.user';
// FUNCTIONS
import { getUserData } from "@/resources/data/user/getUserData";
import { getUserFollowers } from "@/resources/data/user/getUserFollowers"
// TYPES
import { FOLLOW, IPageProps, IUser, IUserFollowers } from "@/utils/types/types";
// STYLES
import styles from '@/styles/pages/follow.page.module.scss';

// Dynamic Metadata for Pages
export const generateMetadata = async (props: IPageProps): Promise<Metadata> => {
  try {
    const user = await getUserData(props);

    if (!user) { notFound() };

    return { title: `Followers / ${user.full_name} — Parallel` };
  }
  catch (error: any) {
    return { title: `Error — Parallel` };
  };
};

const UserFollowersPage = async (props: IPageProps) => {

  const userData = await getUserData(props);

  if (!userData) { notFound() };

  const res: IUserFollowers[] = await getUserFollowers(props.params.userID);

  let arr: IUser[] = [];

  for (const follow of res) {
    arr.push(follow.following_user);
  }

  return (
    <div className={styles.page}>

      <Header
        title={<HeaderTitle props={userData} />}
        action={<HeaderAction userID={userData.id} />}
        info={<HeaderInfo props={userData} params={props.params} type={FOLLOW.USER} />}
      />

      <div className={styles.page__box}>
        <div className={styles.page__box__title}>{arr.length} FOLLOWERS</div>

        <div className={styles.page__box__grid}>
          {
            arr.map((user) => (
              <UserGrid user={user} key={user.id}/>
            ))
          }
        </div>
      </div>


    </div>
  )
};

export default UserFollowersPage;