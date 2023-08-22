"use client";
// Packages
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
// Imports
import { persistor, useAppDispatch } from "@/store";
import { setIsMenuOpen } from "@/store/menuSlice";
import { LogOutUser } from "@/resources/data/user/logoutUser";
import styles from '@/styles/layout/nav.module.scss';

const LogoutButton = () => {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const { trigger, error } = LogOutUser();

    const logOut: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();

        await persistor.purge(); // Clear storage
        
        // Clear cookie
        trigger().then((success) => {
            if (success) {
                dispatch(setIsMenuOpen(false));
                router.replace('/');
            }
        })
    };

    return (
        <button
            className={styles.nav__menu__dropdown__bottom__section__links}
            onClick={logOut}
        >
            Log Out
        </button>
    )
};

export default LogoutButton;