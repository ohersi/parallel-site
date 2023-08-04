// Packages
import { Metadata } from "next";
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
import { FOLLOW, IPageProps, IUser } from "@/utils/types/types";
// STYLES
import styles from '@/styles/pages/follow.page.module.scss';

// Dynamic Metadata for Pages
export const generateMetadata = async (props: IPageProps): Promise<Metadata> => {
  try {
    const user = await getUserData(props) as IUser;
    return { title: `Followers / ${user.full_name} — Parallel` };
  }
  catch (error: any) {
    return { title: `Error — Parallel` };
  };
};

type IUserFollowers = {
  following_user: IUser;
  followed_user: number;
  date_created: Date;
}

const UserFollowersPage = async (props: IPageProps) => {

  const userData = await getUserData(props) as IUser;
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
              <UserGrid user={user} />
            ))
          }
        </div>
      </div>


    </div>
  )
};

export default UserFollowersPage;