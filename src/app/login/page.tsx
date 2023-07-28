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
            <div className={styles.page__right_svg_container}>
                <svg xmlns="http://www.w3.org/2000/svg" width="140" height="92" viewBox="0 0 140 92" fill="none">
                    <rect x="0.047914" y="0.375849" width="75" height="75" transform="matrix(0.965926 0.258819 -0.870098 0.492879 66.7347 34.1163)" fill="#FCF9F8" stroke="currentColor" />
                    <rect x="0.047914" y="0.375849" width="75" height="75" transform="matrix(0.965926 0.258819 -0.870098 0.492879 66.7347 17.3205)" fill="#FCF9F8" stroke="currentColor" />
                    <rect x="0.047914" y="0.375849" width="75" height="75" transform="matrix(0.965926 0.258819 -0.870098 0.492879 66.7347 0.524773)" fill="#FCF9F8" stroke="currentColor" />
                </svg>
            </div>
            <LoginForm />
            <div className={styles.page__left_svg_container}>
                <svg xmlns="http://www.w3.org/2000/svg" width="140" height="92" viewBox="0 0 140 92" fill="none">
                    <rect x="0.047914" y="0.375849" width="75" height="75" transform="matrix(0.965926 0.258819 -0.870098 0.492879 66.7347 34.1163)" fill="#FCF9F8" stroke="currentColor" />
                    <rect x="0.047914" y="0.375849" width="75" height="75" transform="matrix(0.965926 0.258819 -0.870098 0.492879 66.7347 17.3205)" fill="#FCF9F8" stroke="currentColor" />
                    <rect x="0.047914" y="0.375849" width="75" height="75" transform="matrix(0.965926 0.258819 -0.870098 0.492879 66.7347 0.524773)" fill="#FCF9F8" stroke="currentColor" />
                </svg>
            </div>
        </div>
    )
};

export default LogInPage;