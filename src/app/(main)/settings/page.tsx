"use client";
// Packages
import { redirect } from "next/navigation";
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import Modal from "@/components/modal/modal";
import UpdateUserForm from "@/components/form/updateUser.form";
import DeleteUserButton from "@/components/button/user/deleteUser.button";
import SendConfirmationButton from "@/components/button/user/sendConfirmation.button";
import { setIsOpen } from "@/store/modalSlice";
import styles from '@/styles/pages/settings.page.module.scss';

const SettingsPage = () => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const user = useAppSelector((state) => state.User.user);

    if (!user) redirect('/');

    return (
        <div className={styles.page}>
            <div className={styles.page__title}>SETTINGS</div>

            <UpdateUserForm user={user} />

            {
                user.enabled === false ?
                    <SendConfirmationButton />
                    : null
            }

            <div className={styles.page__delete}>
                <div className={styles.page__delete__title}>
                    Delete Account
                </div>
                <button
                    className={styles.page__delete__button}
                    onClick={() => { dispatch(setIsOpen(!isOpen)) }}>
                    delete &nbsp; x
                </button>
            </div>
            {
                isOpen && user && user.id ?
                    <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)) }} isOpen={isOpen}>
                        <DeleteUserButton userID={user.id} />
                    </Modal>
                    : null
            }
        </div>
    )
};

export default SettingsPage;