"use client";
// Packages
import useSWRMutation from 'swr/mutation';
// Imports
import { DeleteUser } from '@/resources/data/user/deleteUser';
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/modalSlice';
import styles from '@/styles/components/form/updateUser.form.module.scss'

type Props = {
    userID: number;
};

const DeleteUserButton = ({ userID }: Props) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    const { trigger, error: error } = useSWRMutation(`api/v1/users/${userID}`, () => DeleteUser(userID));

    const handleClick = async () => {
        await trigger()
            .then((res) => {
                if (res?.success) {
                    dispatch(setIsOpen(!isOpen));
                }
                else {
                    //TODO: Return error and try again
                }
            }
            );
    };

    return (
        <div className={styles.settings__modal}>
            <div className={styles.settings__modal__box}>
                <div className={styles.settings__modal__box__title}>Do you want to delete your account?</div>

                <div className={styles.settings__modal__box__buttons}>
                    <button
                        className={styles.settings__modal__box__buttons__btn}
                        onClick={() => { dispatch(setIsOpen(!isOpen)) }}>
                        cancel
                    </button>
                    <button
                        className={styles.settings__modal__box__buttons__btn}
                        onClick={handleClick}>
                        confirm &nbsp; ✓
                    </button>
                </div>
            </div>
        </div>
    )
};

export default DeleteUserButton;