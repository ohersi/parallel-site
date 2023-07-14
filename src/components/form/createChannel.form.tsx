"use client"
// Packages
import useSWRMutation from 'swr/mutation';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// REDUX
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/isModalOpenSlice';
import { setFormType } from '@/store/formTypeSlice';
// VALIDATIONS
import channelValidation from '@/resources/validations/channel.validation';
// FUNCTIONS
import { CreateChannel } from '@/resources/data/channel/createChannel';
import { isEmpty } from '@/resources/isEmpty';
// TPYES
import { IChannelPayload } from '@/utils/types/types';
// STYLES
import styles from '@/styles/components/form/createChannel.form.module.scss';

let channelPayload: IChannelPayload = {};

const CreateChannelForm = () => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(channelValidation.create)
    });

    const { trigger, error: error } = useSWRMutation(`api/v1/channels`, () => CreateChannel(channelPayload));

    const setChannelValues = async (data: FieldValues) => {

        if (data.title) channelPayload.title = data.title;
        if (data.description) channelPayload.description = data.description;

        return channelPayload;
    };

    const onSubmit = async (data: FieldValues) => {

        await setChannelValues(data).then(async (payload) => {
            try {
                if (!isEmpty(channelPayload)) {
                    await trigger();
                }
                // Reset payload
                channelPayload = {};
            }
            catch (error: any) {
                // TODO: Setup error handling
                console.log(error);
            }
        });
    };

    return (
        <div className={styles.modal}>

            <div className={styles.modal__box}>
                <div className={styles.modal__box__close_btn}>
                    <svg
                        onClick={() => {
                            dispatch(setIsOpen(!isOpen));
                            dispatch(setFormType(''));
                        }}
                        xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 15" fill="none">
                        <line x1="1.96612" y1="0.427971" x2="16.0827" y2="14.5446" stroke="currentColor" />
                        <line x1="1.25901" y1="14.5445" x2="15.3756" y2="0.427954" stroke="currentColor" />
                    </svg>
                </div>

                <h2>Create Channel</h2>

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
                                placeholder="Title"
                                autoComplete="off"
                                {...register("title", { required: true })}
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
                        <span className={styles.modal__box__form__item__input}>
                            <input
                                className='input'
                                type="text"
                                placeholder="Description"
                                autoComplete="off"
                                {...register("description", { required: true })}
                            />
                        </span>
                        <span className='error'>{errors?.description?.message?.toString()}</span>
                    </div>

                    <div className={styles.modal__box__form__submit}>
                        <button className={styles.modal__box__form__submit__btn}>create</button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default CreateChannelForm;