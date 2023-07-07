"use client";
// Packages
// Imports
import { setIsOpen } from '@/store/isModalOpenSlice';
import { setFormType } from '@/store/formTypeSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { FORM } from '@/utils/types/types';
import styles from "@/styles/components/button.module.scss";

const EditBlockButton = () => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    return (
        <div
            onClick={() => { { dispatch(setFormType(FORM.BLOCK_UPDATE)); console.log('update block clicked') } }}
            className={styles.button}
        >
            edit
        </div>
    )
};

export default EditBlockButton;