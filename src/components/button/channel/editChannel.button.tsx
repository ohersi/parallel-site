"use client";
// Imports
import { setIsOpen } from '@/store/isModalOpenSlice';
import { setFormType } from '@/store/formTypeSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { FORM } from '@/utils/types/types';
import styles from '@/styles/components/button.module.scss';

// Opens modal
const EditChannelButton = () => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    return (
        <>
            <div className={styles.button}>
                <button onClick={() => { dispatch(setIsOpen(!isOpen)); dispatch(setFormType(FORM.CHANNEL_UPDATE)) }}>Edit Channel</button>
            </div>
        </>
    )
};

export default EditChannelButton;