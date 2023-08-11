// Imports
import Header from '@/components/header/header';
import HeaderInfo from '@/components/header/info.header';
import HeaderTitle from '@/components/header/title.header';
import HeaderAction from '@/components/header/header.action';
import Loader from '@/components/loader/loader';
import styles from '@/styles/pages/channel.page.module.scss';

export default function Loading() {
    
    return (
        <div className={styles.page}>
            <Header
                title={<HeaderTitle props={'Loading'} />}
                action={<HeaderAction />}
                info={<HeaderInfo props={'Loading'} type={'Loading'} />}
            />

            <div className={styles.page__loading}>
                <Loader />
            </div>
        </div>
    )
}