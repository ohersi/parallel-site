"use client";
// Packages
// Imports
import { DeleteUser } from '@/resources/data/user/deleteUser';

type Props = {
    user: any;
};

const DeleteUserButton = ({ user }: Props) => {

    return (
        <>
            {
                user && user.id ?
                    <button onClick={() => DeleteUser(user?.id)}>Delete User</button>
                    : null
            }
        </>
    )
};

export default DeleteUserButton;