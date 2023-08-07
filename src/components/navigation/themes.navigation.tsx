"use client";
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import { setTheme } from '@/store/themeSlice';
import { THEME } from '@/utils/types/types';
import styles from '@/styles/layout/nav.module.scss';

const NavThemes = () => {

    const dispatch = useAppDispatch();
    const currentTheme = useAppSelector((state) => state.Theme.theme);

    const handleClick = (theme: string) => {
        dispatch(setTheme(theme));
        const element = document.body;
        element.className = '';
        if (theme !== THEME.DEFAULT) {
            element.classList.add(`theme_${theme}`);
        }
    }

    return (
        <div className={styles.nav__themes}>
            <button
                className={styles.nav__themes__buttons}
                onClick={() => handleClick(THEME.DEFAULT)}>
                <div className={styles.nav__themes__buttons__circle_green_white_left} />
                <div className={styles.nav__themes__buttons__circle_green_white_right} />
            </button>
            <button
                className={styles.nav__themes__buttons}
                onClick={() => handleClick(THEME.RED_PINK)}>
                <div className={styles.nav__themes__buttons__circle_red_pink_left} />
                <div className={styles.nav__themes__buttons__circle_red_pink_right} />
            </button>
            <button
                className={styles.nav__themes__buttons}
                onClick={() => handleClick(THEME.WHITE_BLUE)}>
                <div className={styles.nav__themes__buttons__circle_white_blue_left} />
                <div className={styles.nav__themes__buttons__circle_white_blue_right} />
            </button>
            <button
                className={styles.nav__themes__buttons}
                onClick={() => handleClick(THEME.BLUE_BLACK)}>
                <div className={styles.nav__themes__buttons__circle_blue_black_left} />
                <div className={styles.nav__themes__buttons__circle_blue_black_right} />
            </button>
            <button
                className={styles.nav__themes__buttons}
                onClick={() => handleClick(THEME.GREY_BLACK)}>
                <div className={styles.nav__themes__buttons__circle_grey_black_left} />
                <div className={styles.nav__themes__buttons__circle_grey_black_right} />
            </button>
            <button
                className={styles.nav__themes__buttons}
                onClick={() => handleClick(THEME.BLACK_WHITE)}>
                <div className={styles.nav__themes__buttons__circle_black_white_left} />
                <div className={styles.nav__themes__buttons__circle_black_white_right} />
            </button>
        </div>
    )
}

export default NavThemes;