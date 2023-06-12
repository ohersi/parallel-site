"use client";
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/isModalOpenSlice';
import { setFormType } from '@/store/formTypeSlice';
import Modal from "@/components/modal/modal";
import UpdateChannelForm from "@/components/form/updateChannel.form";
import CreateChannelForm from '@/components/form/createChannel.form';
import { IChannel, FORM } from '@/utils/types/types';

interface IChannelFormModal  {
    channel?: IChannel;
}

const ChannelFormModal = ({ channel }: IChannelFormModal) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const formType = useAppSelector((state) => state.Form.formType);

    return (
        <>
            {
                isOpen && formType.includes('CHANNEL') ?
                    <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)); dispatch(setFormType('')); }} isOpen={isOpen}>
                        {
                            formType == FORM.CHANNEL_UPDATE ? 
                            <UpdateChannelForm channel={channel!}/>
                            : formType == FORM.CHANNEL_CREATE ?
                            <CreateChannelForm />
                            : null
                        }
                    </Modal>
                    : null
            }
        </>
    )
};

export default ChannelFormModal;