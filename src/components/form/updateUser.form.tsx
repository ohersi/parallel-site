"use client"
// Packages
import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import { setUser } from '@/store/userSlice';
import { UpdateUser } from '@/resources/data/user/updateUser';
import userValidation from '@/resources/validations/user.validation';
import { IUserPayload } from '@/utils/types/types';
import { isEmpty } from '@/resources/isEmpty';

/* 
    Redux store gets reset on page reload or when entering an url,
    route changes through links or redirects do not reset store
*/

let userPayload: IUserPayload = {};

const UpdateUserForm = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.User.user);

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(userValidation.update)
    });

    // Redux
    // TODO: replace userpayload.email 
    const { trigger, error: error } = useSWRMutation(userPayload.email ? userPayload.email : 'test', () => UpdateUser(userPayload));


    const setUserValues = async (data: FieldValues) => {

        if (data.first_name) userPayload.first_name = data.first_name;
        if (data.last_name) userPayload.last_name = data.last_name;
        if (data.email) userPayload.email = data.email;
        if (data.password) userPayload.password = data.password;
        if (data.avatar) userPayload.avatar = data.avatar;

        console.log(`userpayload: ${JSON.stringify(userPayload)}`);

        return userPayload;
    };

    const onSubmit = async (data: FieldValues) => {

        await setUserValues(data).then(async (payload) => {
            try {
                if (!isEmpty(userPayload)) {
                    const res = await trigger();
                    dispatch(setUser(res));
                }
                // Reset payload
                userPayload = {};
            }
            catch (error: any) {
                // TODO: Setup error handling
                console.log(error);
            }
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label htmlFor="first_name">First Name</label>
                    <input
                        className='input'
                        type="text"
                        placeholder="First Name"
                        autoComplete="off"
                        {...register("first_name")}
                    />
                    <span className='error'>{errors?.first_name?.message?.toString()}</span>
                </div>

                <div>
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        className='input'
                        type="text"
                        placeholder="Last Name"
                        autoComplete="off"
                        {...register("last_name", { required: false })}
                    />
                    <span className='error'>{errors?.last_name?.message?.toString()}</span>
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        className='input'
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                        {...register("email", { required: false })}
                    />
                    <span className='error'>{errors?.email?.message?.toString()}</span>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        className='input'
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: false })}
                    />
                    <span className='error'>{errors?.password?.message?.toString()}</span>
                </div>

                <div>
                    <label htmlFor="avatar">Avatar</label>
                    <input
                        className='input'
                        type="url"
                        placeholder="Avatar"
                        autoComplete="off"
                        {...register("avatar", { required: false })}
                    />
                    <span className='error'>{errors?.avatar?.message?.toString()}</span>
                </div>

                <button>Submit</button>
            </form>
            <div>
                {JSON.stringify(user)}
            </div>
        </>
    );
};

export default UpdateUserForm;