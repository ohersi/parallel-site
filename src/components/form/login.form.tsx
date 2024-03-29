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
import { LogInUser } from '@/resources/data/user/loginUser';
import userValidation from '@/resources/validations/user.validation';
import styles from '@/styles/components/form/login.form.module.scss';

const LoginForm = () => {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failed, setFailed] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(userValidation.login)
    });

    const { trigger, error: error } = useSWRMutation('api/v1/users/login', () => LogInUser(email, password));

    const setUserValues = async (data: FieldValues) => {
        setEmail(data.email);
        setPassword(data.password);
    };

    const onSubmit = async (data: FieldValues) => {

        setFailed(false);

        await setUserValues(data).then(async () => {
            await trigger()
                .then((res) => {
                    dispatch(setUser(res));
                    dispatch(setSession(true));
                    router.push('/feed');
                })
                .catch((error: any) => setFailed(true));
        });
    };

    return (
        <div className={styles.login}>

            <div className={styles.login__svg_container}>
                <Link href={'/'}>
                    <svg
                        className={styles.login__svg_container__svg}
                        xmlns="http://www.w3.org/2000/svg" width="140" height="92" viewBox="0 0 140 92" fill="none">
                        <rect x="0.047914" y="0.375849" width="75" height="75" transform="matrix(0.965926 0.258819 -0.870098 0.492879 66.7347 34.1163)" />
                        <rect x="0.047914" y="0.375849" width="75" height="75" transform="matrix(0.965926 0.258819 -0.870098 0.492879 66.7347 17.3205)" />
                        <rect x="0.047914" y="0.375849" width="75" height="75" transform="matrix(0.965926 0.258819 -0.870098 0.492879 66.7347 0.524773)" />
                    </svg>
                </Link>
            </div>

            <div className={styles.login__title}>Login</div>

            <form
                className={styles.login__form}
                onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.login__form__item}>
                    <label
                        className={styles.login__form__item__label}
                        htmlFor="email">
                        Email
                    </label>
                    <span className={styles.login__form__item__input}>
                        <input
                            className='input'
                            type="email"
                            autoComplete="off"
                            {...register("email")}
                        />
                    </span>
                    <span className='error'>{errors?.email?.message?.toString()}</span>
                </div>

                <div className={styles.login__form__item}>
                    <label
                        className={styles.login__form__item__label}
                        htmlFor="password">
                        Password
                    </label>
                    <span className={styles.login__form__item__input}>
                        <input
                            className='input'
                            type="password"
                            {...register("password")}
                        />
                    </span>
                    <span className='error'>{errors?.password?.message?.toString()}</span>
                </div>

                {
                    failed ?
                        <div className={styles.login__form__failed_text}>
                            Invalid email or password
                        </div>
                        : null
                }

                <div className={styles.login__form__submit}>
                    <button className={styles.login__form__submit__btn}>login</button>
                </div>
            </form>
            <div className={styles.login__form__signup}>
                Don&apos;t have an account?&nbsp;
                <Link href={'/signup'}>
                    <span className={styles.login__form__signup__link}>Sign up here.</span>
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;