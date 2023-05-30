import Link from "next/link";
import styles from "../../styles/navigation/nav.module.css";

interface INavProfile {

};

const NavProfile = (props: INavProfile) => {

    return (
        <>
            <Link href={'/settings'}>
                <div className={styles.nav_logo_container}>
                </div>
            </Link>
        </>
    )
};

export default NavProfile;