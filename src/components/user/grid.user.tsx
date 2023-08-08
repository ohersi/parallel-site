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
                    <div className={styles.block__user__box__image}>
                        <div className={styles.block__user__box__image__img}>
                            <Image
                                alt='test'
                                src={`https://d2w9rnfcy7mm78.cloudfront.net/22787874/original_659280da012bef94901275155344921c.jpg?1690203802?bc=0`}
                                fill
                                sizes='100vw'
                                style={{
                                    objectFit: 'contain',
                                    maxWidth: '5rem',
                                    maxHeight: '5rem',
                                    margin: "0 auto",
                                }}
                            />
                        </div>
                    </div>
                    <div>{user.full_name}</div>
                </div>
            </Link>
        </div>
    )
};

export default UserGrid;