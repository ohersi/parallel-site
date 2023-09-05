import Loader from '@/components/loader/loader';
import styles from '@/styles/components/block/block.module.scss';

interface ILoadingBlock {
    replaceURL: ((newURL: string) => void) | undefined;
    pathname: string | undefined;
}

const LoadingBlock = ({ replaceURL, pathname }: ILoadingBlock) => {
    return (
        <div className={replaceURL && pathname ? styles.page__modal_loading : styles.page__loading}>
            <Loader />
        </div>
  )
};

export default LoadingBlock;