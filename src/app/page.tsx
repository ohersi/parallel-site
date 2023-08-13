// Packages
import { Metadata } from 'next';
import Link from 'next/link';
// Imports
import Nav from '@/components/navigation/nav';
import NavLogo from '@/components/navigation/logo.navigation';
import NavProfile from '@/components/navigation/profile.navigation';
import NavSearch from '@/components/navigation/search.navigation';
import styles from '@/styles/pages/home.page.module.scss';

export const metadata: Metadata = {
  title: 'Parallel',
  description: 'Home Page',
}

const HomePage = async () => {

  return (
    <main>
      <Nav search={<NavSearch />} logo={<NavLogo />} profile={<NavProfile />} />

      <div className={styles.page}>

        <div className={styles.page__main}>

          <div className={styles.page__main__logo}>
            <div className={styles.page__main__logo__title}>
              PARA <span className={styles.page__main__logo__title__font}>/</span> LLEL
            </div>
          </div>

          <div className={styles.page__main__svg_container}>
            <svg
              className={styles.page__main__svg_container__svg}
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 250" fill="none">
              <rect x="0.047914" y="0.375849" width="207.645" height="207.645" transform="matrix(0.965926 0.258819 -0.870098 0.492879 181.937 92.4198)" />
              <rect x="0.047914" y="0.375849" width="207.645" height="207.645" transform="matrix(0.965926 0.258819 -0.870098 0.492879 181.937 46.3097)" />
              <rect x="0.047914" y="0.375849" width="207.645" height="207.645" transform="matrix(0.965926 0.258819 -0.870098 0.492879 181.937 0.199837)" />
            </svg>
          </div>

          <div className={styles.page__main__link}>
            <Link href={`/explore`}>explore &#8594;</Link>
          </div>

        </div>

      </div>
    </main>
  )
};

export default HomePage;
