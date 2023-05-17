import { ReactNode } from "react";
import styles from "@/styles/navigation/nav.module.css"

/* 
Nav consists of:
   search - e.g link to search page
   logo - e.g. Site name links to home page
   profile - e.g. user image - drop down menu
*/

interface INav {
    search?: ReactNode;
    logo?: ReactNode;
    profile?: ReactNode;
};

const Nav = ({ search, logo, profile }: INav) => {
    return (
        <div className={styles.container}>
            <div>{search}</div>
            <div>{logo}</div>
            <div>{profile}</div>
        </div>
    )
};

export default Nav;