"use client";
// Packages
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
// Imports
import { useAppSelector } from '@/store';
import Header from '@/components/header/header';
import HeaderTitle from '@/components/header/title.header';
import UserFeed from '@/components/feed/user.feed';
import styles from '@/styles/pages/feed.page.module.scss';

export const metadata: Metadata = {
    title: 'Feed',
    description: 'Feed Page',
}

const FeedPage = async () => {

    const session = useAppSelector((state) => state.Session.session);

    if (!session) redirect('/login');

    return (
        <div className={styles.page}>
            {
                session ?
                    <>
                        <Header title={<HeaderTitle props={'Feed'} />} />
                        <UserFeed />
                    </>
                    :
                    <div className={styles.page__error}>
                        Login required!
                    </div>
            }
        </div>
    )
};

export default FeedPage;