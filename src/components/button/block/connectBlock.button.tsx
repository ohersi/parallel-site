"use client";
// Packages
import Link from 'next/link';
// REDUX
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/modalSlice';
import { setButtonType } from '@/store/buttonTypeSlice';
import { setBlockClicked } from '@/store/blockClickedSlice';
// TYPES
import { BUTTON } from "@/utils/types/types";
// STYLES
import styles from "@/styles/components/button.module.scss";

interface IConnectBlockButton {
    blockID: number;
}

const ConnectBlockButton = ({ blockID }: IConnectBlockButton) => {

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.User.user);
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const blockModalOpen = useAppSelector((state) => state.Modal.isBlockModalOpen);

    return (
        <>
            {
                user ?
                    <button
                        className={styles.button}
                        onClick={() => {
                            blockModalOpen ? null : dispatch(setIsOpen(!isOpen));
                            dispatch(setButtonType(BUTTON.BLOCK_CONNECTION_CREATE));
                            dispatch(setBlockClicked(blockID))
                        }}>
                        connect
                    </button>
                    :
                    <Link href={'/login'}>
                        <button className={styles.button}>connect</button>
                    </Link>
            }
        </>
    )
};

export default ConnectBlockButton;