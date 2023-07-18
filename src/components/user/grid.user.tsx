"use client";
// Packages
import Link from 'next/link';
// Imports
import { IUser } from '@/utils/types/types';
import styles from '@/styles/components/search/grid.search.module.scss';

interface IUserGrid {
    user: IUser
}

const UserGrid = ({ user }: IUserGrid) => {

    return (
        <Link href={`${user.slug}`}>
            <div className={styles.user_block}>
                <div className={styles.user_block__image}>

                </div>
                <div>{user.full_name}</div>
            </div>
        </Link>
    )
};

export default UserGrid;