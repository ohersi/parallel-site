"use client";
// Packages
import { useState } from "react";
// Imports
import { DeleteChannel } from "@/resources/data/channel/deleteChannel";
import { useAppDispatch, useAppSelector } from "@/store";
import { setIsOpen } from "@/store/isModalOpenSlice";
import { BUTTON } from "@/utils/types/types";

type Props = {
    channelID: number;
};

const DeleteChannelButton = ({ channelID }: Props) => {

    const [clicked, setClicked] = useState('');

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    const handleClick = async (id: number) => {
        await DeleteChannel(id)
            .then(() => {
                setClicked('');
                dispatch(setIsOpen(!isOpen));
            })
    };

    return (
        <>
            {
                clicked == BUTTON.CHANNEL_DELETE ?
                    <div>
                        <h4>Do you want to delete Channel?</h4>
                        <button onClick={() => { setClicked('') }}>Cancel</button>
                        <button onClick={() => handleClick(channelID)}>Confirm</button>
                    </div>
                    :
                    <button onClick={() => { setClicked(BUTTON.CHANNEL_DELETE) }}>Delete Channel</button>
            }
        </>
    )
};

export default DeleteChannelButton;