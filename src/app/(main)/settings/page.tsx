"use client";
// Packages
import { redirect } from "next/navigation";
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import UpdateUserForm from "@/components/form/updateUser.form";
import DeleteUserButton from "@/components/button/user/deleteUser.button";
import styles from '@/styles/pages/settings.page.module.scss';
import Modal from "@/components/modal/modal";
import { setIsOpen } from "@/store/modalSlice";

const SettingsPage = () => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const user = useAppSelector((state) => state.User.user);

    if (!user) redirect('/');

    return (
        <div className={styles.page}>
            <div className={styles.page__title}>SETTINGS</div>

            <UpdateUserForm user={user}/>

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