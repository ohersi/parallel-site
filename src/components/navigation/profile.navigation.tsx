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
                    <div>
                        <Link href={'/login'}>
                            <div >
                                Login
                            </div>
                        </Link>
                        <Link href={'/signup'}>
                            <div >
                                Sign Up
                            </div>
                        </Link>
                    </div>
            }
        </>
    )
};

export default NavProfile;