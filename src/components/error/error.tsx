"use client"
// Imports
import styles from '@/styles/pages/error.page.module.scss';

type IError = {
    error: Error;
    reset: () => void;
}

const ErrorComponent = ({ error, reset }: IError) => {
    return (
        <div className={styles.error}>
            <span>Something went wrong!</span>
            <button
                className={styles.error__button}
                onClick={() => reset()}>
                try again
            </button>
        </div>
    )
}

export default ErrorComponent;