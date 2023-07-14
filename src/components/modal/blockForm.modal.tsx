"use client";
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/modalSlice';
import { setFormType } from '@/store/formTypeSlice';
import Modal from "@/components/modal/modal";
import UpdateBlockForm from '../form/updateBlock.form';
import CreateBlockForm from '@/components/form/createBlock.form';
import { IBlock, FORM } from '@/utils/types/types';

interface IBlockFormModal {
    channelID?: number,
}

const BlockFormModal = ({ channelID }: IBlockFormModal) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const formType = useAppSelector((state) => state.Form.formType);

    return (
        <>
            {
                isOpen && formType == FORM.BLOCK_CREATE ?
                    <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)); dispatch(setFormType('')); }} isOpen={isOpen}>
                        <CreateBlockForm channelID={channelID!} />
                    </Modal>
                    : null

            }
        </>
    )
};

export default BlockFormModal;