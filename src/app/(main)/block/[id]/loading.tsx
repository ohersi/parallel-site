// Imports
import Loader from '@/components/loader/loader';
import styles from '@/styles/components/block/block.module.scss';

export default function Loading() {
    return (
        <div className={styles.page}>
            <div className={styles.page__loading}>
                <Loader />
            </div>
        </div>
    )
};