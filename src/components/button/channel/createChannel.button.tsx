"use client";
// Imports
import { setIsOpen } from '@/store/modalSlice';
import { setFormType } from '@/store/formTypeSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { FORM, IUser } from '@/utils/types/types';
import styles from '@/styles/components/button.module.scss';

interface ICreateChannelButton {
    userID: number
}

// Opens modal
const CreateChannelButton = ({ userID }: ICreateChannelButton) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const loggedInUser = useAppSelector((state) => state.User.user);

    return (
        <>
            {
                loggedInUser && userID == loggedInUser.id ?
                    <button
                        className={styles.button}
                        onClick={() => {
                            dispatch(setIsOpen(!isOpen));
                            dispatch(setFormType(FORM.CHANNEL_CREATE));
                            console.log('create channel clicked')
                        }}>
                        + create channel
                    </button>
                    : null
            }
        </>
    )
};

export default CreateChannelButton;