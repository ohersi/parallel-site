"use client";
// Packages
import Link from 'next/link';
// REDUX
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/isModalOpenSlice';
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

    // TODO: Link to sign up page if no user

    return (
        <>
            {
                user ?
                    <button
                        className={styles.button}
                        onClick={() => {
                            dispatch(setIsOpen(!isOpen));
                            dispatch(setButtonType(BUTTON.BLOCK_CONNECTION_CREATE));
                            dispatch(setBlockClicked(blockID))
                            console.log('connect button clicked')
                        }}>
                        connect
                    </button>
                    :
                    <button className={styles.button}>
                        <Link href={'/'}>connect</Link>
                    </button>
            }
        </>
    )
};

export default ConnectBlockButton;