// Packages
import Link from "next/link";
// Imports
import styles from "@/styles/layout/nav.module.scss";

const NavLogo = () => {

  return (
    <div className={styles.nav__logo}>
      <Link href={'/'}>
        <svg className={styles.nav__logo__svg}
          xmlns="http://www.w3.org/2000/svg" width="51" height="34" viewBox="0 0 51 34" fill="none">
          <rect x="0.047914" y="0.375849" width="26.6453" height="26.6453" transform="matrix(0.965926 0.258819 -0.870098 0.492879 24.611 13.0396)" />
          <rect x="0.047914" y="0.375849" width="26.6453" height="26.6453" transform="matrix(0.965926 0.258819 -0.870098 0.492879 24.611 6.93006)" />
          <rect x="0.047914" y="0.375849" width="26.6453" height="26.6453" transform="matrix(0.965926 0.258819 -0.870098 0.492879 24.611 0.820549)" />
        </svg>
      </Link>
    </div>
  )
};

export default NavLogo;