"use client";
// Packages
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/isModalOpenSlice';
import { setFormType } from '@/store/formTypeSlice';
import Modal from "@/components/modal/modal";
import UpdateChannelForm from "@/components/form/updateChannel.form";
import CreateChannelForm from '@/components/form/createChannel.form';
import { IChannel, FORM } from '@/utils/types/types';

interface IChannelModal  {
    channel?: IChannel;
}

const ChannelModal = ({ channel }: IChannelModal) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const formType = useAppSelector((state) => state.Form.formType);

    return (
        <>
            {
                isOpen ?
                    <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)); dispatch(setFormType('')); }} isOpen={isOpen}>
                        {
                            formType == FORM.UPDATE ? 
                            <UpdateChannelForm channel={channel!}/>
                            : formType == FORM.CREATE ?
                            <CreateChannelForm />
                            : null
                        }
                    </Modal>
                    : null
            }
        </>
    )
};

export default ChannelModal;