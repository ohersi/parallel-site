// Imports
import Loader from '@/components/loader/loader';
import styles from '@/styles/components/block/block.module.scss';

export default function Loading() {

    return (
        <div className={styles.page}>
            {/* <div className={styles.block}>

                <div className={styles.block__image_wrapper}>
                    <div className={styles.block__image_wrapper__image}>
                        <div className={styles.block__image_wrapper__image__img}>
                            <Loader />
                        </div>
                    </div>
                </div>

                <div className={styles.block__resize}></div>

                <div className={styles.block__info}>

                    <div className={styles.block__info__text}>
                        <span className={styles.block__info__text__title}>
                        &nbsp;
                        </span>
                        <p className={styles.block__info__text__description}>&nbsp;</p>
                    </div>

                    <div className={styles.block__info__metadata}>
                        <span>
                            &nbsp;
                        </span>
                        <span >
                            &nbsp;
                        </span>
                        <span>
                            &nbsp;
                        </span>
                    </div>

                    <div className={styles.block__info__links}>
                        <span className={styles.block__info__links__title}>Actions</span>
                        <div className={styles.block__info__links__buttons}>
                            &nbsp;
                            &nbsp;
                        </div>
                    </div>

                    <div className={styles.block__info__connections}>

                        <span className={styles.block__info__description}>CONNECTION</span>
                    </div>

                </div>
            </div> */}

            <div className={styles.page__loading}>
                <Loader />
            </div>
        </div>
    )
}