"use client";
// Packages
import Link from 'next/link';
// Imports
import { IUser } from '@/utils/types/types';

interface IUserGrid {
    user: IUser
}

const UserGrid = ({ user }: IUserGrid) => {

    return (
        <>
            <Link href={`${user.slug}`}>
                <div>
                    <h4>{user.full_name}</h4>
                </div>
            </Link>

        </>
    )
};

export default UserGrid;