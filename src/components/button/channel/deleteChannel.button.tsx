"use client";
// Packages
import { useState } from "react";
import useSWRMutation from 'swr/mutation';
// Imports
import { DeleteChannel } from "@/resources/data/channel/deleteChannel";
import { useAppDispatch, useAppSelector } from "@/store";
import { setIsOpen } from "@/store/modalSlice";
import { BUTTON } from "@/utils/types/types";
import styles from "@/styles/components/form/updateChannel.form.module.scss";

type Props = {
    channelID: number;
};

const DeleteChannelButton = ({ channelID }: Props) => {

    const [clicked, setClicked] = useState('');

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    const { trigger, error: error } = useSWRMutation(`api/v1/channels/${channelID}`, () => DeleteChannel(channelID));

    const handleClick = async () => {
        await trigger()
            .then(() => {
                setClicked('');
                dispatch(setIsOpen(!isOpen));
            })
    };

    return (
        <div className={styles.modal__delete__container}>
            {
                clicked == BUTTON.CHANNEL_DELETE ?
                    <div>
                        <h4>Do you want to delete channel?</h4>
                        <div className={styles.modal__delete__container__buttons}>
                            <button
                                className={styles.modal__delete__container__buttons__btn}
                                onClick={() => { setClicked('') }}>
                                cancel
                            </button>
                            <button
                                className={styles.modal__delete__container__buttons__btn}
                                // onClick={() => handleClick}>
                                onClick={() => console.log('testing delete channel btn!')}>
                                confirm &nbsp; ✓
                            </button>
                        </div>
                    </div>
                    :
                    <button
                        className={styles.modal__delete__container__btn}
                        onClick={() => { setClicked(BUTTON.CHANNEL_DELETE) }}>
                        delete channel &nbsp; x
                    </button>
            }
        </div>
    )
};

export default DeleteChannelButton;