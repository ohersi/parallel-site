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
        <div className={styles.block__user}>
            <Link href={`${user.slug}`}>
                <div className={styles.block__user__box}>
                    <div className={styles.block__user__box__image}>

                    </div>
                    <div>{user.full_name}</div>
                </div>
            </Link>
        </div>
    )
};

export default UserGrid;