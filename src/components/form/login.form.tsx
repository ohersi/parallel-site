"use client"
// Packages
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import { setUser } from '@/store/userSlice';
import { LogInUser } from '@/resources/data/user/loginUser';
import userValidation from '@/resources/validations/user.validation';

/* 
    Redux store gets reset on page reload or when entering an url,
    route changes through links or redirects do not reset store
*/

const LoginForm = () => {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(userValidation.login)
    });

    // Redux
    const { trigger, error: error } = useSWRMutation('api/v1/users/login', () => LogInUser(email, password));
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.User.user);


    const setUserValues = async (data: FieldValues) => {
        setEmail(data.email);
        setPassword(data.password);
    };

    const onSubmit = async (data: FieldValues) => {

        await setUserValues(data).then(async () => {
            try {
                const res = await trigger();
                dispatch(setUser(res));
                // router.push('/');
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
                    <label htmlFor="email">Email</label>
                    <input
                        className='input'
                        type="email"
                        placeholder="email"
                        autoComplete="off"
                        {...register("email")}
                    />
                    <span className='error'>{errors?.email?.message?.toString()}</span>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        className='input'
                        type="password"
                        placeholder="password"
                        {...register("password")}
                    />
                    <span className='error'>{errors?.password?.message?.toString()}</span>
                </div>
                <button>Submit</button>
            </form>
            <div>
                {JSON.stringify(user)}
            </div>
        </>
    );
};

export default LoginForm;