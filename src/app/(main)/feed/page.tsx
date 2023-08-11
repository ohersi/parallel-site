// Packages
import { cookies } from 'next/headers';
import { Metadata } from 'next';
// Imports
import Header from '@/components/header/header';
import HeaderTitle from '@/components/header/title.header';
import UserFeed from '@/components/feed/user.feed';
import styles from '@/styles/pages/feed.page.module.scss';

export const metadata: Metadata = {
    title: 'Feed',
    description: 'Feed Page',
}

const FeedPage = async () => {

    const cookieStore = cookies();
    const session = cookieStore.has(process.env.SESSION_ID!);
    console.log(session)

    return (
        <div className={styles.page}>
            {
                session ?
                    <>
                        <Header
                            title={<HeaderTitle props={'Feed'} />}
                        />
                        <UserFeed />
                    </>
                    :
                    <div className={styles.page__login}>
                        Login required!
                    </div>
            }
        </div>
    )
};

export default FeedPage;