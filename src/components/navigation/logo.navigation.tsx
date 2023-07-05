// Packages
import Link from "next/link";
// Imports
import styles from "@/styles/layout/nav.module.scss";

const NavLogo = () => {

  return (
    <div className={styles.nav__logo}>
      <Link href={'/'}>Parallel</Link>
    </div>
  )
};

export default NavLogo;