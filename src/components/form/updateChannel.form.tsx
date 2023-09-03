"use client"
// Packages
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// REDUX
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/modalSlice';
import { setFormType } from '@/store/formTypeSlice';
// COMPONENTS
import DeleteChannelButton from '@/components/button/channel/deleteChannel.button';
// VALIDATIONS
import channelValidation from '@/resources/validations/channel.validation';
// FUNCTIONS
import { UpdateChannel } from '@/resources/data/channel/updateChannel';
import { isEmpty } from '@/resources/isEmpty';
// TYPES
import { IChannel, IChannelPayload } from '@/utils/types/types';
// STYLES
import styles from "@/styles/components/form/updateChannel.form.module.scss";

interface IUpdateChannelForm {
    channel: IChannel;
}

let channelPayload: IChannelPayload = {};

const UpdateChannelForm = ({ channel }: IUpdateChannelForm) => {

    const [failed, setFailed] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(channelValidation.update)
    });

    const { trigger, error: error } = useSWRMutation(`api/v1/channels/update`, () => UpdateChannel(channelPayload, channel.id));

    const setChannelValues = async (data: FieldValues) => {

        if (data.title && data.title !== channel.title) channelPayload.title = data.title;

        if (data.description && data.description !== channel.description) channelPayload.description = data.description;

        return channelPayload;
    };

    const onSubmit = async (data: FieldValues) => {

        await setChannelValues(data).then(async () => {

            if (!isEmpty(channelPayload)) {
                await trigger()
                    .then((res) => {
                        if (res?.success) {
                            dispatch(setIsOpen(!isOpen));
                            dispatch(setFormType(''));
                        }
                        else setFailed(true);
                    })
                    .catch((error: any) => console.log(error));
            }
            // Reset payload
            channelPayload = {};
        });
    };

    return (
        <div className={styles.modal}>

            <div className={styles.modal__box}>
                <div className={styles.modal__box__close_btn}>
                    <svg
                        className={styles.modal__box__close_btn__svg}
                        onClick={() => {
                            dispatch(setIsOpen(!isOpen));
                            dispatch(setFormType(''));
                        }}
                        xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 15" fill="none">
                        <line x1="1.96612" y1="0.427971" x2="16.0827" y2="14.5446" stroke="currentColor" />
                        <line x1="1.25901" y1="14.5445" x2="15.3756" y2="0.427954" stroke="currentColor" />
                    </svg>
                </div>

                <span className={styles.modal__box__title}>Update Channel</span>


                <form
                    className={styles.modal__box__form}
                    onSubmit={handleSubmit(onSubmit)}
                >

                    <div className={styles.modal__box__form__item}>
                        <label
                            className={styles.modal__box__form__item__label}
                            htmlFor="title">
                            Title
                        </label>
                        <span className={styles.modal__box__form__item__input}>
                            <input
                                className='input'
                                type="text"
                                autoComplete="off"
                                defaultValue={channel.title}
                                {...register("title")}
                            />
                        </span>
                        <span className='error'>{errors?.title?.message?.toString()}</span>
                    </div>

                    <div className={styles.modal__box__form__item}>
                        <label
                            className={styles.modal__box__form__item__label}
                            htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className={styles.modal__box__form__item__textarea}
                            autoComplete="off"
                            defaultValue={channel.description}
                            {...register("description", { required: false })}
                        />
                        <span className='error'>{errors?.description?.message?.toString()}</span>
                    </div>

                    <div className={styles.modal__box__form__submit}>
                        <button
                            onClick={() => setFailed(false)}
                            className={styles.modal__box__form__submit__btn}>
                            {failed ? 'try again' : 'save changes'}
                        </button>
                    </div>
                </form>

                <div className={styles.modal__delete}>
                    <span className={styles.modal__box__title}>Delete Channel</span>
                    <DeleteChannelButton channelID={channel.id} />
                </div>
            </div>

        </div>
    );
};

export default UpdateChannelForm;