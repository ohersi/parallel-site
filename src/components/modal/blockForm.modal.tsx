"use client";
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/isModalOpenSlice';
import { setFormType } from '@/store/formTypeSlice';
import Modal from "@/components/modal/modal";
import CreateBlockForm from '@/components/form/createBlock.form';
import { IBlock, FORM } from '@/utils/types/types';

interface IBlockFormModal {
    block?: IBlock,
    channelID?: number,
}

const BlockFormModal = ({ block, channelID }: IBlockFormModal) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const formType = useAppSelector((state) => state.Form.formType);

    // TODO: Create UpdateBlockForm

    return (
        <>
            {
                isOpen ?
                    <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)); dispatch(setFormType('')); }} isOpen={isOpen}>
                        {
                            formType == FORM.BLOCK_CREATE ?
                                <CreateBlockForm channelID={channelID!}/>
                                : null
                        }
                    </Modal>
                    : null

            }
        </>
    )
};

export default BlockFormModal;