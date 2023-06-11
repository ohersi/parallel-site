"use client"
// Packages
import useSWRMutation from 'swr/mutation';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// Imports
import { CreateBlock } from '@/resources/data/block/createBlock';
import blockValidation from '@/resources/validations/block.validation';
import { IBlockPayload } from '@/utils/types/types';
import { isEmpty } from '@/resources/isEmpty';

interface ICreateBlockForm {
    channelID: number
}

let blockPayload: IBlockPayload = {};

const CreateBlockForm = ({ channelID }: ICreateBlockForm) => {

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
                    await trigger();
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
        <>
            <h4>CREATE BLOCK</h4>
            
            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        className='input'
                        type="text"
                        placeholder="Title"
                        autoComplete="off"
                        {...register("title", { required: true })}
                    />
                    <span className='error'>{errors?.title?.message?.toString()}</span>
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        className='input'
                        type="text"
                        placeholder="Description"
                        autoComplete="off"
                        {...register("description", { required: true })}
                    />
                    <span className='error'>{errors?.description?.message?.toString()}</span>
                </div>

                <div>
                    <label htmlFor="image_url">Image URL</label>
                    <input
                        className='input'
                        type="text"
                        placeholder="image url"
                        autoComplete="off"
                        {...register("image_url", { required: true })}
                    />
                    <span className='error'>{errors?.image_url?.message?.toString()}</span>
                </div>

                <div>
                    <label htmlFor="source_url">Source URL</label>
                    <input
                        className='input'
                        type="text"
                        placeholder="source url"
                        autoComplete="off"
                        {...register("source_url", { required: true })}
                    />
                    <span className='error'>{errors?.source_url?.message?.toString()}</span>
                </div>

                <button>Submit</button>
            </form>
        </>
    );
};

export default CreateBlockForm;