"use client";
// Packages
import Link from 'next/link';
import Image from 'next/image';
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
                    <div>{user.full_name}</div>
                    <div className={styles.block__user__box__image}>
                        {
                            user.avatar ?
                                <div className={styles.block__user__box__image__img}>
                                    <Image
                                        alt='test'
                                        src={user.avatar}
                                        fill
                                        sizes='100vw'
                                        style={{
                                            objectFit: 'contain',
                                            maxWidth: '140px',
                                            maxHeight: '140px',
                                            margin: "0 auto",
                                        }}
                                    />
                                </div>
                                :
                                <div className={styles.block__user__box__image__default}>
                                    {`${user.first_name.charAt(0).toUpperCase()} ${user.last_name.charAt(0).toUpperCase()}`}
                                </div>
                        }
                    </div>
                </div>
            </Link>
        </div>
    )
};

export default UserGrid;