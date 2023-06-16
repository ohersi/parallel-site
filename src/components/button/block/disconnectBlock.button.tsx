"use client";
// Packages
import { Dispatch, SetStateAction } from "react";
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import { setButtonType } from '@/store/buttonTypeSlice';
import { setIsOpen } from '@/store/isModalOpenSlice';
import { DisconnectBlock } from "@/resources/data/block/disconnectBlock";
import { BUTTON } from "@/utils/types/types";


interface IDisconnectBlockButton {
    blockID: number;
    setBlockClicked: Dispatch<SetStateAction<number | undefined>>
}

const DisconnectBlockButton = ({ blockID, setBlockClicked }: IDisconnectBlockButton) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    return (
        <>
            <button onClick={() => {
                dispatch(setIsOpen(!isOpen));
                dispatch(setButtonType(BUTTON.BLOCK_CONNECTION_DELETE));
                setBlockClicked(blockID);
                console.log(`removing connection b/w block [${blockID}] to channel`)
            }}
            >Remove Connect
            </button>
        </>
    )
};

export default DisconnectBlockButton;