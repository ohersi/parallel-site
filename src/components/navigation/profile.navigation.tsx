"use client";
// Packages
import Link from "next/link";
// Imports
import { useAppSelector } from '@/store';
import LogoutButton from "@/components/button/user/logOut.button";
import styles from "@/styles/layout/nav.module.scss";

interface INavProfile {

};

const NavProfile = (props: INavProfile) => {

    const user = useAppSelector((state) => state.User.user);

    return (
        <>
            {
                user ?
                    <div className={styles.nav__account}>
                        <Link href={'/settings'}>
                            <div className={styles.nav__profile_container}>
                            </div>
                        </Link>
                        <LogoutButton />
                    </div>
                    :
                    <div className={styles.nav__account}>
                        <Link href={'/login'}>
                            <div className={styles.nav__account__login}>
                                Login
                            </div>
                        </Link>
                        <Link href={'/signup'}>
                            <div className={styles.nav__account__signup}>
                                Sign Up
                            </div>
                        </Link>
                    </div>
            }
        </>
    )
};

export default NavProfile;