"use client";
// Packages
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/modalSlice';
import { setButtonType } from '@/store/buttonTypeSlice';
import { setBlockClicked } from '@/store/blockClickedSlice';
import { BUTTON } from "@/utils/types/types";
import styles from "@/styles/components/button.module.scss";

interface IDisconnectBlockButton {
    blockID: number;
}

const DisconnectBlockButton = ({ blockID }: IDisconnectBlockButton) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    return (
        <>
            <button
                className={styles.button}
                onClick={() => {
                    dispatch(setIsOpen(!isOpen));
                    dispatch(setButtonType(BUTTON.BLOCK_CONNECTION_DELETE));
                    dispatch(setBlockClicked(blockID));
                }}
            >disconnect
            </button>
        </>
    )
};

export default DisconnectBlockButton;