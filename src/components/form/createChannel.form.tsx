"use client"
// Packages
import useSWRMutation from 'swr/mutation';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// Imports
import { CreateChannel } from '@/resources/data/channel/createChannel';
import channelValidation from '@/resources/validations/channel.validation';
import { IChannelPayload } from '@/utils/types/types';
import { isEmpty } from '@/resources/isEmpty';

let channelPayload: IChannelPayload = {};

const CreateChannelForm = () => {

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
        <>
            <h4>CREATE CHANNEL</h4>
            
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

                <button>Submit</button>
            </form>
        </>
    );
};

export default CreateChannelForm;