// Packages
import { KeyedMutator, mutate } from 'swr';
// Imports
import { IBlock } from '@/utils/types/types';
import styles from '@/styles/components/block/block.module.scss';

interface IErrorBlock {
    replaceURL: ((newURL: string) => void) | undefined;
    pathname: string | undefined;
    mutate: KeyedMutator<IBlock | null>
}

const ErrorBlock = ({ replaceURL, pathname, mutate }: IErrorBlock) => {
    return (
        <div className={replaceURL && pathname ? styles.page__modal_error : styles.page__error}>
            <div className={styles.page__error__text}>
                <span>FAILED TO LOAD&nbsp;</span>
                <span>&nbsp;:(</span>
            </div>
            <button
                className={styles.page__error__button}
                onClick={() => mutate()}>
                try again
            </button>
        </div>
    )
}

export default ErrorBlock;