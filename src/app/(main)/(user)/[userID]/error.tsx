'use client';
// Imports
import styles from '@/styles/pages/error.page.module.scss';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {

    return (
        <div className={styles.error}>
            {error.message}
        </div>
    )
};

export default Error;