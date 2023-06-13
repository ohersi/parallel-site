"use client";
// Packages
// Imports
import { setIsOpen } from '@/store/isModalOpenSlice';
import { setFormType } from '@/store/formTypeSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { FORM } from '@/utils/types/types';
import styles from "@/styles/channel/channel.module.css";

const EditBlockButton = () => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    return (
        <div
            onClick={() => { { dispatch(setFormType(FORM.BLOCK_UPDATE)); console.log('update block clicked') } }}
            className={styles.channel_blocks}
        >
            Update Block
        </div>
    )
};

export default EditBlockButton;