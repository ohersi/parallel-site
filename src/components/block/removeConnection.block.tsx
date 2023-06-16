"use client";
// Packages
import useSWRMutation from "swr/mutation";
// Imports
import { useAppDispatch, useAppSelector } from "@/store";
import { setIsOpen } from "@/store/isModalOpenSlice";
import { DisconnectBlock } from "@/resources/data/block/disconnectBlock";

interface IRemoveConnectionBlock {
    blockID: number;
    channelID: number;
}

const RemoveConnectionBlock = ({ blockID, channelID }: IRemoveConnectionBlock) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    const { trigger, error: error } = useSWRMutation(`api/v1/blocks/${blockID}/disconnect?channel=${channelID}`, () => DisconnectBlock(blockID, channelID));

    const handleClick = async () => {
        await trigger()
            .then(() => dispatch(setIsOpen(!isOpen)));
    }

    return (
        <>
            <h4>Do you want to remove connection block:{blockID} from channel:{channelID}?</h4>
            <button onClick={() => { dispatch(setIsOpen(!isOpen)) }}>Cancel</button>
            <button onClick={() => handleClick}>Confirm</button>
        </>
    )
};

export default RemoveConnectionBlock;