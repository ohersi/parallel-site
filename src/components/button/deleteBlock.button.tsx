"use client";
// Imports
import { useAppDispatch, useAppSelector } from "@/store";
import { setIsOpen } from "@/store/isModalOpenSlice";
import Modal from "@/components/modal/modal";
import { DeleteBlock } from "@/resources/data/block/deleteBlock";

type Props = {
    blockID: number;
};

const DeleteBlockButton = ({ blockID }: Props) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    const handleClick = async (id: number) => {
        await DeleteBlock(id)
            .then(() => dispatch(setIsOpen(!isOpen)))
    };

    return (
        <>
            <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)) }} isOpen={isOpen}>
                <div>
                    <h4>Do you want to delete Block?</h4>
                    <button onClick={() => { dispatch(setIsOpen(!isOpen)) }}>Cancel</button>
                    <button onClick={() => handleClick(blockID)}>Confirm</button>
                </div>
            </Modal>
            <button onClick={() => { dispatch(setIsOpen(!isOpen)) }}>Delete Block</button>
        </>
    )
};

export default DeleteBlockButton;