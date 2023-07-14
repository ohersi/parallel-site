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

                            <div className={styles.nav__menu__dropdown__close_btn}>
                                <svg
                                    onClick={() => setVisible((prev) => !prev)}
                                    xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 15" fill="none">
                                    <line x1="1.96612" y1="0.427971" x2="16.0827" y2="14.5446" stroke="currentColor" />
                                    <line x1="1.25901" y1="14.5445" x2="15.3756" y2="0.427954" stroke="currentColor" />
                                </svg>
                            </div>

                            <div className={styles.nav__menu__dropdown__top}>
                                <div className={styles.nav__menu__dropdown__top__img_container}>
                                </div>
                                <div className={styles.nav__menu__dropdown__top__text_container}>
                                    <span className={styles.nav__menu__dropdown__top__text_container__name}>
                                        {user.full_name}
                                    </span>
                                    <p>Profile</p>
                                </div>
                            </div>

                            <div className={styles.nav__menu__dropdown__bottom}>
                                <div className={styles.nav__menu__dropdown__bottom__section}>
                                    <span className={styles.nav__menu__dropdown__bottom__section__links}>
                                        <Link href={`/feed`}>Feed</Link>
                                    </span>
                                    <span className={styles.nav__menu__dropdown__bottom__section__links}>
                                        <Link href={`/explore`}>Explore</Link>
                                    </span>
                                </div>

                                <div className={styles.nav__menu__dropdown__bottom__section}>
                                    <span className={styles.nav__menu__dropdown__bottom__section__links}>
                                        <Link href={`/settings`}>Settings</Link>
                                    </span>
                                    <span className={styles.nav__menu__dropdown__bottom__section__links}>
                                        About
                                    </span>
                                    <LogoutButton />
                                </div>
                            </div>

                        </div>
                    </div>
                    :
                    <div className={styles.nav__account}>
                        <Link href={'/login'}>
                            <button className={styles.nav__account__login}>
                                login
                            </button>
                        </Link>
                        <Link href={'/signup'}>
                            <button className={styles.nav__account__signup}>
                                sign up
                            </button>
                        </Link>
                    </div>
            }
        </>
    )
};

export default NavProfile;