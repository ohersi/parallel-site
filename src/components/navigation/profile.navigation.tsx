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
                        <div className={styles.nav__account__desktop}>
                            <Link href={'/login'}>
                                <button className={styles.nav__account__desktop__login}>
                                    login
                                </button>
                            </Link>
                            <Link href={'/signup'}>
                                <button className={styles.nav__account__desktop__signup}>
                                    sign up
                                </button>
                            </Link>
                        </div>
                        <div className={styles.nav__account__mobile}>
                            <div
                                className={styles.nav__account__mobile__btn}>
                                <svg
                                    onClick={() => setVisible((prev) => !prev)}
                                    xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
                                    <path d="M17.305 6.02387C17.305 8.67243 15.1579 10.8195 12.5093 10.8195C9.86077 10.8195 7.71368 8.67243 7.71368 6.02387C7.71368 3.3753 9.86077 1.22821 12.5093 1.22821C15.1579 1.22821 17.305 3.3753 17.305 6.02387Z" stroke="currentColor" />
                                    <path d="M24.1995 25.2679C24.1995 23.7327 23.8971 22.2126 23.3096 20.7943C22.7221 19.376 21.861 18.0873 20.7755 17.0017C19.69 15.9162 18.4013 15.0551 16.9829 14.4676C15.5646 13.8801 14.0445 13.5778 12.5093 13.5778C10.9741 13.5778 9.45399 13.8801 8.03568 14.4676C6.61736 15.0551 5.32865 15.9162 4.24312 17.0017C3.15759 18.0873 2.2965 19.376 1.70901 20.7943C1.12153 22.2126 0.819153 23.7327 0.819153 25.2679" stroke="currentColor" />
                                </svg>
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

                                <div className={styles.nav__menu__dropdown__bottom}>

                                    <div className={styles.nav__menu__dropdown__bottom__section}>
                                        <span className={styles.nav__menu__dropdown__bottom__section__links}>
                                            <Link href={`/login`}>Login</Link>
                                        </span>
                                        <span className={styles.nav__menu__dropdown__bottom__section__links}>
                                            <Link href={`/signup`}>Sign Up</Link>
                                        </span>
                                    </div>

                                    <div className={styles.nav__menu__dropdown__bottom__section}>
                                        <span className={styles.nav__menu__dropdown__bottom__section__links}>
                                            <Link href={`/explore`}>Explore</Link>
                                        </span>
                                        <span className={styles.nav__menu__dropdown__bottom__section__links}>
                                            <Link href={`/about`}>About</Link>
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
};

export default NavProfile;