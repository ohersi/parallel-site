import SignUpForm from '@/components/form/signup.form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Join',
    description: 'Sign up page',
};

const SignUpPage = () => {
    return (
        <>
            <div>SIGN UP PAGE</div>
            <SignUpForm />
        </>
    )
};

export default SignUpPage;