"use client";
// Packages
// Imports
import { setFormType } from '@/store/formTypeSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { FORM } from '@/utils/types/types';
import styles from "@/styles/channel/channel.module.css";
import { setIsOpen } from '@/store/isModalOpenSlice';

const CreateBlockButton = () => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    return (
        <div
            onClick={() => { { dispatch(setIsOpen(!isOpen)); dispatch(setFormType(FORM.BLOCK_CREATE)); console.log('create block clicked') } }}
            className={styles.channel_blocks}
        >
            Add Block
        </div>
    )
};

export default CreateBlockButton;