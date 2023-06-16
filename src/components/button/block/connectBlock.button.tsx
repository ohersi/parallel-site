"use client";
// Packages
import { Dispatch, SetStateAction } from 'react';
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import { setButtonType } from '@/store/buttonTypeSlice';
import { setIsOpen } from '@/store/isModalOpenSlice';
import { BUTTON } from "@/utils/types/types";
import Link from 'next/link';

interface IConnectBlockButton {
    blockID: number;
    setBlockClicked: Dispatch<SetStateAction<number | undefined>>
}

const ConnectBlockButton = ({ blockID, setBlockClicked }: IConnectBlockButton) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const user = useAppSelector((state) => state.User.user);

    // TODO: Link to sign up page if no user

    return (
        <>
            {
                user ?
                    <button onClick={() => {
                        dispatch(setIsOpen(!isOpen));
                        dispatch(setButtonType(BUTTON.BLOCK_CONNECTION_CREATE));
                        setBlockClicked(blockID);
                        console.log('connect button clicked')
                    }}>
                        Connect
                    </button>
                    :
                    <button>
                        <Link href={'/'}>Connect</Link>
                    </button>
            }
        </>
    )
};

export default ConnectBlockButton;