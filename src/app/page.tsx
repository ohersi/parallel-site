// Packages
import { cookies } from 'next/headers';
import { Metadata } from 'next';
// Imports
import DefaultFeed from '@/components/feed/default.feed';
import Nav from '@/components/navigation/nav';
import NavLogo from '@/components/navigation/logo.navigation';
import NavProfile from '@/components/navigation/profile.navigation';
import NavSearch from '@/components/navigation/search.navigation';
import styles from '@/styles/pages/home.page.module.scss';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home Page',
}

const HomePage = async () => {

  const cookieStore = cookies();
  const session = cookieStore.has(process.env.SESSION_ID!);

  return (
    <main>
      <Nav search={<NavSearch />} logo={<NavLogo />} profile={<NavProfile />} />

      <div className={styles.page}>
        <div className={styles.page__logo}>
          <div className={styles.page__logo__title}>
            PARA <span className={styles.page__logo__title__font}>/</span> LLEL
          </div>
        </div>
        <div className={styles.page__logo__svg}>
          <svg
            className={styles.page__logo__svg__test}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 250" fill="none">
            <rect x="0.047914" y="0.375849" width="207.645" height="207.645" transform="matrix(0.965926 0.258819 -0.870098 0.492879 181.937 92.4198)" fill="#FCF9F8" stroke="#215BDF" />
            <rect x="0.047914" y="0.375849" width="207.645" height="207.645" transform="matrix(0.965926 0.258819 -0.870098 0.492879 181.937 46.3097)" fill="#FCF9F8" stroke="#215BDF" />
            <rect x="0.047914" y="0.375849" width="207.645" height="207.645" transform="matrix(0.965926 0.258819 -0.870098 0.492879 181.937 0.199837)" fill="#FCF9F8" stroke="#215BDF" />
          </svg>
        </div>
      </div>
      <div>
        {
          cookieStore.getAll().map((cookie) => (
            <div key={cookie.name}>
              <p>Name: {cookie.name}</p>
              <p>Value: {cookie.value}</p>
            </div>
          ))
        }
      </div>
    </main>
  )
};

export default HomePage;
