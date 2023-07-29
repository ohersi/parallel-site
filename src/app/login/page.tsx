// "use client";
// Packages
import Link from "next/link";
import { Metadata } from "next";
// Imports
import LoginForm from "@/components/form/login.form";
import styles from "@/styles/pages/login.page.module.scss";

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login page',
};

const LogInPage = async () => {

    return (
        <div className={styles.page}>
            <div className={styles.page__back_btn}>
                <Link href={'/'}>&#8592;</Link>
            </div>
            {/* <div className={styles.page__right_svg_container}>
                <svg
                    className={styles.page__right_svg_container__svg}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1131 736" fill="none">
                    <rect x="0.047914" y="0.375849" width="614.325" height="614.325" transform="matrix(0.965926 0.258819 -0.870098 0.492879 535.977 272.891)" fill="#FCF9F8" stroke="#215BDF" />
                    <rect x="0.047914" y="0.375849" width="614.325" height="614.325" transform="matrix(0.965926 0.258819 -0.870098 0.492879 535.977 136.905)" fill="#FCF9F8" stroke="#215BDF" />
                    <rect x="0.047914" y="0.375849" width="614.325" height="614.325" transform="matrix(0.965926 0.258819 -0.870098 0.492879 535.977 0.920876)" fill="#FCF9F8" stroke="#215BDF" />
                </svg>
            </div> */}
            <LoginForm />
            {/* <div className={styles.page__left_svg_container}>
                <svg
                    className={styles.page__left_svg_container__svg}
                    xmlns="http://www.w3.org/2000/svg" width="1131" height="736" viewBox="0 0 1131 736" fill="none">
                    <rect x="0.047914" y="0.375849" width="614.325" height="614.325" transform="matrix(0.965926 0.258819 -0.870098 0.492879 535.977 272.891)" fill="#FCF9F8" stroke="#215BDF" />
                    <rect x="0.047914" y="0.375849" width="614.325" height="614.325" transform="matrix(0.965926 0.258819 -0.870098 0.492879 535.977 136.905)" fill="#FCF9F8" stroke="#215BDF" />
                    <rect x="0.047914" y="0.375849" width="614.325" height="614.325" transform="matrix(0.965926 0.258819 -0.870098 0.492879 535.977 0.920876)" fill="#FCF9F8" stroke="#215BDF" />
                </svg>
            </div> */}
        </div>
    )
};

export default LogInPage;