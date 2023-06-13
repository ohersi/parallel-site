"use client"
// Packages
import useSWRMutation from 'swr/mutation';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// Imports
import { UpdateChannel } from '@/resources/data/channel/updateChannel';
import DeleteChannelButton from '@/components/button/channel/deleteChannel.button';
import channelValidation from '@/resources/validations/channel.validation';
import { IChannel, IChannelPayload } from '@/utils/types/types';
import { isEmpty } from '@/resources/isEmpty';

interface IUpdateChannelForm {
    channel: IChannel;
}

let channelPayload: IChannelPayload = {};

const UpdateChannelForm = ({ channel }: IUpdateChannelForm) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(channelValidation.update)
    });

    const { trigger, error: error } = useSWRMutation(`api/v1/channels/${channel.id}/update`, () => UpdateChannel(channelPayload, channel.id));

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
            <h4>UPDATE CHANNEL</h4>
            
            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        className='input'
                        type="text"
                        placeholder="Title"
                        autoComplete="off"
                        defaultValue={channel.title}
                        {...register("title")}
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
                        defaultValue={channel.description}
                        {...register("description", { required: false })}
                    />
                    <span className='error'>{errors?.description?.message?.toString()}</span>
                </div>

                <button>Submit</button>
            </form>
            <DeleteChannelButton channelID={channel.id}/>
        </>
    );
};

export default UpdateChannelForm;