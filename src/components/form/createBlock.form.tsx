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
// FUNCTIONS
import { CreateBlock } from '@/resources/data/block/createBlock';
import { isEmpty } from '@/resources/isEmpty';
// VALIDATIONS
import blockValidation from '@/resources/validations/block.validation';
// TYPES
import { IBlockPayload } from '@/utils/types/types';
// STYLES
import styles from "@/styles/components/form/createBlock.form.module.scss";

interface ICreateBlockForm {
    channelID: number
}

let blockPayload: IBlockPayload = {};

const CreateBlockForm = ({ channelID }: ICreateBlockForm) => {

    const [failed, setFailed] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const formType = useAppSelector((state) => state.Form.formType);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(blockValidation.create)
    });

    const { trigger, error: error } = useSWRMutation(`api/v1/blocks`, () => CreateBlock(blockPayload, channelID));

    const setBlockValues = async (data: FieldValues) => {

        if (data.title) blockPayload.title = data.title;
        if (data.description) blockPayload.description = data.description;
        if (data.image_url) blockPayload.image_url = data.image_url;
        if (data.source_url) blockPayload.source_url = data.source_url;

        return blockPayload;
    };

    const onSubmit = async (data: FieldValues) => {

        await setBlockValues(data).then(async (payload) => {
            try {
                if (!isEmpty(blockPayload)) {
                    await trigger()
                        .then((res: any) => {
                            if (!res.success) {
                                setFailed(true);
                            }
                        })
                        .catch((error: any) => console.log(error));
                }
                // Reset payload
                blockPayload = {};
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

                <span className={styles.modal__box__title}>Create Block</span>

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
                                autoComplete="off"
                                {...register("description", { required: true })}
                            />
                        </span>
                        <span className='error'>{errors?.description?.message?.toString()}</span>
                    </div>

                    <div className={styles.modal__box__form__item}>
                        <label
                            className={styles.modal__box__form__item__label}
                            htmlFor="image_url">
                            Image URL
                        </label>
                        <span className={styles.modal__box__form__item__input}>
                            <input
                                className='input'
                                type="text"
                                autoComplete="off"
                                {...register("image_url", { required: true })}
                            />
                        </span>
                        <span className='error'>{errors?.image_url?.message?.toString()}</span>
                    </div>

                    <div className={styles.modal__box__form__item}>
                        <label
                            className={styles.modal__box__form__item__label}
                            htmlFor="source_url">
                            Source URL
                        </label>
                        <span className={styles.modal__box__form__item__input}>
                            <input
                                className='input'
                                type="text"
                                autoComplete="off"
                                {...register("source_url", { required: true })}
                            />
                        </span>
                        <span className='error'>{errors?.source_url?.message?.toString()}</span>
                    </div>
                    <div className={styles.modal__box__form__submit}>
                        <button className={styles.modal__box__form__submit__btn}>create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBlockForm;