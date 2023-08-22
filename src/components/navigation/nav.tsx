import { ReactNode } from "react";
import styles from "@/styles/layout/nav.module.scss";

interface INav {
    search?: ReactNode;
    logo?: ReactNode;
    profile?: ReactNode;
};

const Nav = ({ search, logo, profile }: INav) => {
    return (
        <nav className={styles.nav}>
            <>{search}</>
            <>{logo}</>
            <>{profile}</>
        </nav>
    )
};

export default Nav;