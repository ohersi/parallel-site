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
            <LoginForm />
        </div>
    )
};

export default LogInPage;