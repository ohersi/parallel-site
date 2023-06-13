"use client";
// Packages
// Imports
import { DeleteUser } from '@/resources/data/user/deleteUser';
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/isModalOpenSlice';
import Modal from '../modal/modal';

type Props = {
    user: any;
};

const DeleteUserButton = ({ user }: Props) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    const handleClick = async (id: number) => {
        // await DeleteUser(id)
        //     .then(() => dispatch(setIsOpen(!isOpen)));
        console.log(`delete user: ${id}`);
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
                                <button onClick={() => handleClick(user?.id)}>Confirm</button>
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