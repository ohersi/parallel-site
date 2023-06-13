"use client";
// Packages
import useSWRMutation from 'swr/mutation';
// Imports
import { DeleteUser } from '@/resources/data/user/deleteUser';
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/isModalOpenSlice';
import Modal from '@/components/modal/modal';

type Props = {
    user: any;
};

const DeleteUserButton = ({ user }: Props) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    const { trigger, error: error } = useSWRMutation(`api/v1/users/${user.id}`, () => DeleteUser(user.id));

    const handleClick = async () => {
        await trigger()
            .then(() => dispatch(setIsOpen(!isOpen)));
    };

    return (
        <>
            {
                user && user.id ?
                    <>
                        <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)) }} isOpen={isOpen}>
                            <div>
                                <h4>Do you want to delete your account?</h4>
                                <button onClick={() => { dispatch(setIsOpen(!isOpen)) }}>Cancel</button>
                                <button onClick={() => handleClick}>Confirm</button>
                            </div>
                        </Modal>
                        <button onClick={() => { dispatch(setIsOpen(!isOpen)) }}>Delete Account</button>
                    </>
                    : null
            }
        </>
    )
};

export default DeleteUserButton;