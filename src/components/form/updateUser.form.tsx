"use client"
// Packages
import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// REDUX
import { useAppDispatch } from '@/store';
import { setUser } from '@/store/userSlice';
// FUNCTIONS
import { UpdateUser } from '@/resources/data/user/updateUser';
import { isEmpty } from '@/resources/isEmpty';
// VALIDATIONS
import userValidation from '@/resources/validations/user.validation';
// TYPES
import { IUserPayload } from '@/utils/types/types';
// STYLES
import styles from '@/styles/components/form/updateUser.form.module.scss'

let userPayload: IUserPayload = {};

type Props = {
    user: any
}

const UpdateUserForm = ({ user }: Props) => {

    const dispatch = useAppDispatch();

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(userValidation.update)
    });

    // Redux
    const { trigger, error: error } = useSWRMutation('api/v1/users/update', () => UpdateUser(userPayload));


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
        <div className={styles.settings}>
            <form
                className={styles.settings__form}
                onSubmit={handleSubmit(onSubmit)}>

                <div className={styles.settings__form__item}>
                    <label
                        className={styles.settings__form__item__label}
                        htmlFor="first_name">
                        First Name
                    </label>
                    <span className={styles.settings__form__item__input}>
                        <input
                            className='input'
                            type="text"
                            autoComplete="off"
                            defaultValue={user.first_name}
                            {...register("first_name")}
                        />
                    </span>
                    <span className='error'>{errors?.first_name?.message?.toString()}</span>
                </div>

                <div className={styles.settings__form__item}>
                    <label
                        className={styles.settings__form__item__label}
                        htmlFor="last_name">
                        Last Name
                    </label>
                    <span className={styles.settings__form__item__input}>
                        <input
                            className='input'
                            type="text"
                            autoComplete="off"
                            defaultValue={user.last_name}
                            {...register("last_name", { required: false })}
                        />
                    </span>
                    <span className='error'>{errors?.last_name?.message?.toString()}</span>
                </div>

                <div className={styles.settings__form__item}>
                    <label
                        className={styles.settings__form__item__label}
                        htmlFor="email">
                        Email
                    </label>
                    <span className={styles.settings__form__item__input}>
                        <input
                            className='input'
                            type="email"
                            autoComplete="off"
                            defaultValue={user.email}
                            {...register("email", { required: false })}
                        />
                    </span>
                    <span className='error'>{errors?.email?.message?.toString()}</span>
                </div>

                <div className={styles.settings__form__item}>
                    <label
                        className={styles.settings__form__item__label}
                        htmlFor="password">
                        Password
                    </label>
                    <span className={styles.settings__form__item__input}>
                        <input
                            className='input'
                            type="password"
                            {...register("password", { required: false })}
                        />
                    </span>
                    <span className='error'>{errors?.password?.message?.toString()}</span>
                </div>

                <div className={styles.settings__form__item}>
                    <label
                        className={styles.settings__form__item__label}
                        htmlFor="avatar">
                        Avatar
                    </label>
                    <span className={styles.settings__form__item__input}>
                        <input
                            className='input'
                            type="url"
                            autoComplete="off"
                            {...register("avatar", { required: false })}
                        />
                    </span>
                    <span className='error'>{errors?.avatar?.message?.toString()}</span>
                </div>

                <div className={styles.settings__form__submit}>
                    <button className={styles.settings__form__submit__btn}>update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUserForm;