"use client";
// Packages
import { useEffect } from "react";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsMenuOpen } from "@/store/menuSlice";
import NavThemes from "@/components/navigation/themes.navigation";
import LogoutButton from "@/components/button/user/logOut.button";
import styles from "@/styles/layout/nav.module.scss";

const NavProfile = () => {

    const pathname = usePathname();

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.User.user);
    const isMenuOpen = useAppSelector((state) => state.Menu.isMenuOpen);

    useEffect(() => {
        dispatch(setIsMenuOpen(false));
    }, [pathname]);

    return (
        <>
            {
                user ?
                    <div className={styles.nav__menu}>
                        <div
                            onClick={() => dispatch(setIsMenuOpen(!isMenuOpen))}
                            className={styles.nav__menu__profile}
                        >
                            <svg
                                className={styles.nav__menu__profile__svg}
                                xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
                                <path d="M17.305 6.02387C17.305 8.67243 15.1579 10.8195 12.5093 10.8195C9.86077 10.8195 7.71368 8.67243 7.71368 6.02387C7.71368 3.3753 9.86077 1.22821 12.5093 1.22821C15.1579 1.22821 17.305 3.3753 17.305 6.02387Z" />
                                <path d="M24.1995 25.2679C24.1995 23.7327 23.8971 22.2126 23.3096 20.7943C22.7221 19.376 21.861 18.0873 20.7755 17.0017C19.69 15.9162 18.4013 15.0551 16.9829 14.4676C15.5646 13.8801 14.0445 13.5778 12.5093 13.5778C10.9741 13.5778 9.45399 13.8801 8.03568 14.4676C6.61736 15.0551 5.32865 15.9162 4.24312 17.0017C3.15759 18.0873 2.2965 19.376 1.70901 20.7943C1.12153 22.2126 0.819153 23.7327 0.819153 25.2679" />
                            </svg>
                        </div>

                        <div className={isMenuOpen ? styles.nav__menu__dropdown : styles.nav__menu__dropdown__hidden}>

                            <div className={styles.nav__menu__dropdown__close}>
                                <svg
                                    className={styles.nav__menu__dropdown__close__btn}
                                    onClick={() => dispatch(setIsMenuOpen(!isMenuOpen))}
                                    xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 15" fill="none">
                                    <line x1="1.96612" y1="0.427971" x2="16.0827" y2="14.5446" />
                                    <line x1="1.25901" y1="14.5445" x2="15.3756" y2="0.427954" />
                                </svg>
                            </div>

                            <div className={styles.nav__menu__dropdown__top}>
                                <Link href={`/${user.slug}`}>
                                    <div className={styles.nav__menu__dropdown__top__image}>
                                        {
                                            user.avatar ?
                                                <div className={styles.nav__menu__dropdown__top__image__img}>
                                                    <Image
                                                        alt='test'
                                                        src={user.avatar}
                                                        fill
                                                        sizes='100vw'
                                                        style={{
                                                            objectFit: 'contain',
                                                            maxWidth: '80px',
                                                            maxHeight: '80px',
                                                            margin: "0 auto",
                                                        }}
                                                    />
                                                </div>
                                                : user.first_name && user.last_name ?
                                                    <div className={styles.nav__menu__dropdown__top__image__default}>
                                                        {`${user.first_name.charAt(0).toUpperCase()} ${user.last_name.charAt(0).toUpperCase()}`}
                                                    </div>
                                                    :
                                                    <div className={styles.nav__menu__dropdown__top__image__default}>
                                                        ? ?
                                                    </div>
                                        }
                                    </div>
                                </Link>
                                <div className={styles.nav__menu__dropdown__top__text_container}>
                                    <span className={styles.nav__menu__dropdown__top__text_container__name}>
                                        <Link href={`/${user.slug}`}>{user.full_name}</Link>
                                    </span>
                                    <Link href={`/${user.slug}`}> <p>Profile</p></Link>
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
                                        <Link href={`/about`}>About</Link>
                                    </span>
                                    <LogoutButton />
                                </div>

                                <div className={styles.nav__menu__dropdown__bottom__section}>
                                    <NavThemes />
                                </div>
                            </div>

                        </div>
                    </div>
                    :
                    <div className={styles.nav__account}>
                        <div className={styles.nav__account__mobile}>
                            <div className={styles.nav__account__mobile__btn}>
                                <svg
                                    className={styles.nav__account__mobile__btn__svg}
                                    onClick={() => dispatch(setIsMenuOpen(!isMenuOpen))}
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16" fill="none">
                                    <line x1="0.190598" y1="14.71" x2="23.5851" y2="14.71" />
                                    <line x1="0.190598" y1="0.709961" x2="23.5851" y2="0.709961" />
                                </svg>
                            </div>

                            <div className={isMenuOpen ? styles.nav__menu__dropdown : styles.nav__menu__dropdown__hidden}>

                                <div className={styles.nav__menu__dropdown__close}>
                                    <svg
                                        className={styles.nav__menu__dropdown__close__btn}
                                        onClick={() => dispatch(setIsMenuOpen(!isMenuOpen))}
                                        xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 15" fill="none">
                                        <line x1="1.96612" y1="0.427971" x2="16.0827" y2="14.5446" />
                                        <line x1="1.25901" y1="14.5445" x2="15.3756" y2="0.427954" />
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

                                    <div className={styles.nav__menu__dropdown__bottom__section}>
                                        <NavThemes />
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