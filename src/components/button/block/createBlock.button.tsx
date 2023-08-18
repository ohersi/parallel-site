"use client";
// Packages
// Imports
import { setFormType } from '@/store/formTypeSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { FORM } from '@/utils/types/types';
import styles from "@/styles/components/channel.module.scss";
import { setIsOpen } from '@/store/modalSlice';

const CreateBlockButton = () => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    return (
        <div
            onClick={() => { { dispatch(setIsOpen(!isOpen)); dispatch(setFormType(FORM.BLOCK_CREATE)); } }}
            className={styles.default_block}
        >
            Add Block
        </div>
    )
};

export default CreateBlockButton;