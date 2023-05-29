"use client"
// Packages
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import { setUser } from '@/store/userSlice';
import { LogInUser } from '@/data/loginUser';
// TODO: Add Joi validation

/* 
    Redux store gets reset on page reload or when entering an url,
    route changes through links or redirects do not reset store
*/

function LoginForm() {
    
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { trigger } = useSWRMutation(email, () => LogInUser(email, password));

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.User.user);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await trigger().then((value) => (dispatch(setUser(value))));
        // router.push('/');
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" autoComplete="email" name="email" required={true}
                        value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" autoComplete="password" name="password" required={true}
                        value={password} onChange={e => setPassword(e.target.value)} />
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