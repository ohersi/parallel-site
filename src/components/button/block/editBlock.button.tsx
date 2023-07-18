"use client";
// Packages
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/modalSlice';
import { setFormType } from '@/store/formTypeSlice';
import { setBlockClicked } from '@/store/blockClickedSlice';
import { FORM } from '@/utils/types/types';
import styles from "@/styles/components/button.module.scss";

interface IEditBlockButton {
    blockID: number;
}

const EditBlockButton = ({ blockID }: IEditBlockButton) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const blockModalOpen = useAppSelector((state) => state.Modal.isBlockModalOpen);

    return (
        <div
            onClick={() => {
                {
                    blockModalOpen ? null : dispatch(setIsOpen(!isOpen));
                    dispatch(setFormType(FORM.BLOCK_UPDATE));
                    dispatch(setBlockClicked(blockID));
                    console.log('update block clicked')
                }
            }}
            className={styles.button}
        >
            edit
        </div>
    )
};

export default EditBlockButton;