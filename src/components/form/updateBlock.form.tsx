"use client"
// Packages
import useSWRMutation from 'swr/mutation';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// REDUX
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/modalSlice';
import { setFormType } from '@/store/formTypeSlice';
import { setBlockClicked } from '@/store/blockClickedSlice';
// VALIDATIONS
import blockValidation from '@/resources/validations/block.validation';
// FUNCTIONS
import { UpdateBlock } from '@/resources/data/block/updateBlock';
import { isEmpty } from '@/resources/isEmpty';
// TYPES
import { IBlock, IBlockPayload } from '@/utils/types/types';
// STYLES
import styles from '@/styles/components/form/updateBlock.form.module.scss';

interface IUpdateBlockForm {
    block: IBlock;
}

let blockPayload: IBlockPayload = {};

const UpdateBlockForm = ({ block }: IUpdateBlockForm) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const formType = useAppSelector((state) => state.Form.formType);
    const blockModalOpen = useAppSelector((state) => state.Modal.isBlockModalOpen);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(blockValidation.update)
    });

    const { trigger, error: error } = useSWRMutation(`api/v1/blocks/${block.id}/update`, () => UpdateBlock(blockPayload, block.id));

    const setBlockValues = async (data: FieldValues) => {

        if (data.title && data.title !== block.title) blockPayload.title = data.title;
        if (data.description && data.description !== block.description) blockPayload.description = data.description;
        if (data.image_url && data.image_url !== block.image_url) blockPayload.image_url = data.image_url;
        if (data.source_url && data.source_url !== block.source_url) blockPayload.source_url = data.source_url;

        return blockPayload;
    };

    const onSubmit = async (data: FieldValues) => {

        await setBlockValues(data).then(async (payload) => {

            if (!isEmpty(blockPayload)) {
                await trigger()
                    .catch((error: any) => console.log(error));
            }
            // Reset payload
            blockPayload = {};
        });
    };

    return (
        <div className={styles.modal}>

            <div className={styles.modal__box}>

                <div className={styles.modal__box__close_btn}>
                    <svg
                        className={styles.modal__box__close_btn__svg}
                        onClick={() => {
                            blockModalOpen ? null : dispatch(setIsOpen(!isOpen));
                            blockModalOpen ? null : dispatch(setBlockClicked(undefined));
                            dispatch(setFormType(''));
                        }}
                        xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 15" fill="none">
                        <line x1="1.96612" y1="0.427971" x2="16.0827" y2="14.5446" stroke="currentColor" />
                        <line x1="1.25901" y1="14.5445" x2="15.3756" y2="0.427954" stroke="currentColor" />
                    </svg>
                </div>

                <span className={styles.modal__box__title}>Update Block</span>

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
                                {...register("title")}
                                defaultValue={block.title}
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
                                {...register("description")}
                                defaultValue={block.description}
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
                                placeholder="image url"
                                autoComplete="off"
                                {...register("image_url")}
                                defaultValue={block.image_url}
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
                                placeholder="source url"
                                autoComplete="off"
                                {...register("source_url")}
                                defaultValue={block.source_url}
                            />
                        </span>
                        <span className='error'>{errors?.source_url?.message?.toString()}</span>
                    </div>

                    <div className={styles.modal__box__form__submit}>
                        <button className={styles.modal__box__form__submit__btn}>update</button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default UpdateBlockForm;