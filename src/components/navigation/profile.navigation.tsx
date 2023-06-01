"use client";
// Packages
import Link from "next/link";
// Imports
import { useAppSelector } from '@/store';
import styles from "../../styles/navigation/nav.module.css";

interface INavProfile {

};

const NavProfile = (props: INavProfile) => {

    const user = useAppSelector((state) => state.User.user);

    return (
        <>
            {
                user ?
                    <Link href={'/settings'}>
                        <div className={styles.nav_logo_container}>
                        </div>
                    </Link>
                    :
                    <Link href={'/login'}>
                        <div >
                            Login
                        </div>
                    </Link>
            }
        </>
    )
};

export default NavProfile;