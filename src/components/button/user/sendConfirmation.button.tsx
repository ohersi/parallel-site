"use client";
// Packages
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
// Imports
import { sendConfirmationToken } from '@/resources/data/user/sendConfirmationToken';
import styles from '@/styles/pages/settings.page.module.scss';

const SendConfirmationButton = () => {

    const [clicked, setClicked] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const { trigger } = useSWRMutation('registration', () => sendConfirmationToken);

    const handleClick = async () => {
        setError(false);
        await trigger()
            .then((res: any) => {
                if (!res.success) setError(true);
            })
            .catch((error: any) => console.log(error));
    }

    return (
        <div className={styles.page__confirmation}>
            {
                clicked && error === false ?
                    <span>Confirmation sent! Check your email.</span>
                    : clicked && error === true ?
                        <span>Error!</span>
                        : <span className={styles.page__confirmation__title}>Unverified email.</span>
            }
            {
                clicked && error === false ?
                    <span className={styles.page__confirmation__resend}>
                        Still have not recieved an email?&nbsp;
                        <button
                            onClick={() => { handleClick(); setClicked(true) }}
                            className={styles.page__confirmation__resend__btn}>
                            Send again.
                        </button>
                    </span>
                    : clicked && error === true ?
                        <span className={styles.page__confirmation__resend}>
                            Try logging in again.
                        </span>
                        : <span className={styles.page__confirmation__resend}>
                            Resend email&nbsp;
                            <button
                                onClick={() => { handleClick(); setClicked(true) }}
                                className={styles.page__confirmation__resend__btn}>
                                confirmation.
                            </button>
                        </span>
            }
        </div>
    )
};

export default SendConfirmationButton;