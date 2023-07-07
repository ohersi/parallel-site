"use client";
// Packages
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'
import Link from "next/link";
// Imports
import { useAppSelector } from '@/store';
import LogoutButton from "@/components/button/user/logOut.button";
import styles from "@/styles/layout/nav.module.scss";

const NavProfile = () => {

    const [visible, setVisible] = useState<boolean>(false);

    const user = useAppSelector((state) => state.User.user);

    const pathname = usePathname();
    
    useEffect(() => setVisible(false), [pathname]);

    return (
        <>
            {
                user ?
                    <div className={styles.nav__menu}>

                        <div
                            onClick={() => setVisible((prev) => !prev)}
                            className={styles.nav__menu__profile}
                        >
                        </div>

                        <div className={visible ? styles.nav__menu__dropdown : styles.nav__menu__dropdown__hidden}>

                            <span className={styles.nav__menu__dropdown_links}>
                                <Link href={`/settings`}>Settings</Link>
                            </span>

                            <span className={styles.nav__menu__dropdown_links}>About</span>

                            <LogoutButton />
                        </div>
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