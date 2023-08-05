// Packages
import Link from 'next/link';
import { Metadata } from 'next';
// Imports
import SignUpForm from '@/components/form/signup.form';
import styles from '@/styles/pages/signup.page.module.scss';

export const metadata: Metadata = {
    title: 'Sign Up',
    description: 'Sign up page',
};

const SignUpPage = () => {
    return (
        <div className={styles.page}>
            <div className={styles.page__back_btn}>
                <Link href={'/'}>&#8592;</Link>
            </div>
            <div className={styles.page__logo}>

                <div className={styles.page__logo__svg_container}>
                    <svg 
                    className={styles.page__logo__svg_container__svg}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1131 736" fill="none">
                        <rect x="0.047914" y="0.375849" width="614.325" height="614.325" transform="matrix(0.965926 0.258819 -0.870098 0.492879 535.977 272.891)" />
                        <rect x="0.047914" y="0.375849" width="614.325" height="614.325" transform="matrix(0.965926 0.258819 -0.870098 0.492879 535.977 136.905)" />
                        <rect x="0.047914" y="0.375849" width="614.325" height="614.325" transform="matrix(0.965926 0.258819 -0.870098 0.492879 535.977 0.920876)" />
                    </svg>
                </div>
                <div className={styles.page__logo__text}>Join the community</div>
            </div>
            <SignUpForm />
        </div>
    )
};

export default SignUpPage;