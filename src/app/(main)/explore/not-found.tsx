// Imports
import styles from '@/styles/pages/not-found.page.module.scss';

const NotFound = () => {

  return (
    <div className={styles.page}>
      <div className={styles.page__title}>404</div>
      <div className={styles.page__text}>
        Could not find what you were looking for :(
      </div>
    </div>
  )
};

export default NotFound;