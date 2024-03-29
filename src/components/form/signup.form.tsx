"use client"
// Packages
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// Imports
import { useAppDispatch } from '@/store';
import { setUser } from '@/store/userSlice';
import { setSession } from '@/store/sessionSlice';
import { SignUpUser } from '@/resources/data/user/signupUser';
import { isEmpty } from '@/resources/isEmpty';
import userValidation from '@/resources/validations/user.validation';
import { IUserPayload } from '@/utils/types/types';
import styles from '@/styles/components/form/signup.form.module.scss';


let userPayload: IUserPayload = {};

const SignUpForm = () => {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const [failed, setFailed] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(userValidation.create)
    });

    const { trigger, error: error } = useSWRMutation('api/v1/users/', () => SignUpUser(userPayload));

    const setUserValues = async (data: FieldValues) => {
        if (data.first_name) userPayload.first_name = data.first_name;
        if (data.last_name) userPayload.last_name = data.last_name;
        if (data.email) userPayload.email = data.email;
        if (data.password) userPayload.password = data.password;
        if (data.avatar) userPayload.avatar = data.avatar;

        return userPayload;
    };

    const onSubmit = async (data: FieldValues) => {

        setFailed(false);

        await setUserValues(data).then(async (payload) => {

            if (!isEmpty(userPayload)) {
                await trigger()
                    .then((res) => {
                        dispatch(setUser(res));
                        dispatch(setSession(true));
                        router.push('/feed');
                    }
                    )
                    .catch((error: any) => { setFailed(true); console.log(error) });
            }
            // Reset payload
            userPayload = {};
        });
    };

    return (
        <div className={styles.signup}>

            <div className={styles.signup__svg_container}>
                <Link href={'/'}>
                    <svg
                        className={styles.signup__svg_container__svg}
                        xmlns="http://www.w3.org/2000/svg" width="140" height="92" viewBox="0 0 140 92" fill="none">
                        <rect x="0.047914" y="0.375849" width="75" height="75" transform="matrix(0.965926 0.258819 -0.870098 0.492879 66.7347 34.1163)" />
                        <rect x="0.047914" y="0.375849" width="75" height="75" transform="matrix(0.965926 0.258819 -0.870098 0.492879 66.7347 17.3205)" />
                        <rect x="0.047914" y="0.375849" width="75" height="75" transform="matrix(0.965926 0.258819 -0.870098 0.492879 66.7347 0.524773)" />
                    </svg>
                </Link>
            </div>

            <form
                className={styles.signup__form}
                onSubmit={handleSubmit(onSubmit)}>

                <div className={styles.signup__form__item}>
                    <label
                        className={styles.signup__form__item__label}
                        htmlFor="first_name">
                        First Name
                    </label>
                    <span className={styles.signup__form__item__input}>
                        <input
                            className='input'
                            type="text"
                            autoComplete="off"
                            {...register("first_name")}
                        />
                    </span>
                    <span className='error'>{errors?.first_name?.message?.toString()}</span>
                </div>

                <div className={styles.signup__form__item}>
                    <label
                        className={styles.signup__form__item__label}
                        htmlFor="last_name">
                        Last Name
                    </label>
                    <span className={styles.signup__form__item__input}>
                        <input
                            className='input'
                            type="text"
                            autoComplete="off"
                            {...register("last_name", { required: false })}
                        />
                    </span>
                    <span className='error'>{errors?.last_name?.message?.toString()}</span>
                </div>

                <div className={styles.signup__form__item}>
                    <label
                        className={styles.signup__form__item__label}
                        htmlFor="email">
                        Email
                    </label>
                    <span className={styles.signup__form__item__input}>
                        <input
                            className='input'
                            type="email"
                            autoComplete="off"
                            {...register("email", { required: false })}
                        />
                    </span>
                    <span className='error'>{errors?.email?.message?.toString()}</span>
                </div>

                <div className={styles.signup__form__item}>
                    <label
                        className={styles.signup__form__item__label}
                        htmlFor="password">
                        Password
                    </label>
                    <span className={styles.signup__form__item__input}>
                        <input
                            className='input'
                            type="password"
                            {...register("password", { required: false })}
                        />
                    </span>
                    <span className='error'>{errors?.password?.message?.toString()}</span>
                </div>

                <div className={styles.signup__form__item}>
                    <label
                        className={styles.signup__form__item__label}
                        htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <span className={styles.signup__form__item__input}>
                        <input
                            className='input'
                            type="password"
                            {...register("confirmPassword", { required: false })}
                        />
                    </span>
                    <span className='error'>{errors?.confirmPassword?.message?.toString()}</span>
                </div>

                <div className={styles.signup__form__item}>
                    <label
                        className={styles.signup__form__item__label}
                        htmlFor="avatar">
                        Avatar
                    </label>
                    <span className={styles.signup__form__item__input}>
                        <input
                            className='input'
                            type="url"
                            autoComplete="off"
                            {...register("avatar", { required: false })}
                        />
                    </span>
                    <span className='error'>{errors?.avatar?.message?.toString()}</span>
                </div>

                {
                    failed ?
                        <div className={styles.login__form__failed_text}>
                            Error, please try again
                        </div>
                        : null
                }

                <div className={styles.signup__form__submit}>
                    <button className={styles.signup__form__submit__btn}>sign up</button>
                </div>
            </form>
            <div className={styles.signup__form__login}>
                Already have an account?&nbsp;
                <Link href={'/login'}>
                    <span className={styles.signup__form__login__link}>Log in here.</span>
                </Link>
            </div>
        </div>
    );
};

export default SignUpForm;