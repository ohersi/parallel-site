// Imports
import Header from '@/components/header/header';
import HeaderInfo from '@/components/header/info.header';
import HeaderTitle from '@/components/header/title.header';
import HeaderAction from '@/components/header/header.action';
import styles from "@/styles/pages/explore.page.module.scss";

export default function Loading() {
    return (
        <div className={styles.page}>
            <Header
                title={<HeaderTitle props={'Explore'} />}
                action={<HeaderAction />}
                info={<HeaderInfo props={'Explore'} />}
            />

            <div className={styles.page__loading}>
                <div className={styles.page__loading__spinner}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
};