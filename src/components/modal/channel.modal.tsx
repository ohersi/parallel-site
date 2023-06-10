"use client";
// Packages
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/isModalOpenSlice';
import Modal from "@/components/modal/modal";
import UpdateChannelForm from "@/components/form/updateChannel.form";
import { IChannel } from '@/utils/types/types';

type Props = {
    channel: IChannel;
}

const ChannelModal = ({ channel }: Props) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    // TODO: Check if create channel or update channel

    return (
        <>
            {
                isOpen ?
                    <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)) }} isOpen={isOpen} >
                        <UpdateChannelForm channel={channel}/>
                    </Modal>
                    : null
            }
        </>
    )
};

export default ChannelModal;