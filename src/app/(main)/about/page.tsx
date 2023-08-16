// Packages
import { Metadata } from 'next';
// Imports
import styles from '@/styles/pages/about.page.module.scss';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Page',
}

const AboutPage = () => {

  return (
    <div className={styles.page}>
      <div className={styles.page__about}>

        <div className={styles.page__about__left}>
          <div className={styles.page__about__left__title}>ABOUT</div>
          <div className={styles.page__about__left__text}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis molestias quaerat dolorem!
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis veniam veritatis at iusto accusamus dolorem tempora quos nisi tenetur omnis debitis, eaque blanditiis maxime doloribus! Aperiam!
          </div>
        </div>

        <div className={styles.page__about__right}>
          <div className={styles.page__about__right__svg_container}>
            <svg
              className={styles.page__about__right__svg_container__svg}
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 250" fill="none">
              <rect x="0.047914" y="0.375849" width="207.645" height="207.645" transform="matrix(0.965926 0.258819 -0.870098 0.492879 181.937 92.4198)" />
              <rect x="0.047914" y="0.375849" width="207.645" height="207.645" transform="matrix(0.965926 0.258819 -0.870098 0.492879 181.937 46.3097)" />
              <rect x="0.047914" y="0.375849" width="207.645" height="207.645" transform="matrix(0.965926 0.258819 -0.870098 0.492879 181.937 0.199837)" />
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.page__title}>HOW IT WORKS</div>

      <div className={styles.page__info}>

        <div className={styles.page__info__section}>
          <div className={styles.page__info__section__diagram}>
            <div className={styles.page__info__section__diagram__text}>
              GATHER IDEAS
            </div>

            <div className={styles.page__info__section__diagram__svg_container}>
              <svg
                className={styles.page__info__section__diagram__svg_container__svg}
                xmlns="http://www.w3.org/2000/svg" width="214" height="62" viewBox="0 0 214 62" fill="none">
                <rect x="153.049" y="0.715763" width="60.07" height="60.07" />
                <rect x="0.908569" y="0.715759" width="60.07" height="60.07" />
                <rect x="76.9786" y="0.715763" width="60.07" height="60.07" />
              </svg>
            </div>

          </div>
          <div className={styles.page__info__section__text}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta cum sed debitis quam, veniam officia minus.
          </div>
        </div>

        <div className={styles.page__info__section}>
          <div className={styles.page__info__section__diagram}>
            <div className={styles.page__info__section__diagram__text}>
              FIND OTHERS
            </div>

            <div className={styles.page__info__section__diagram__svg_container}>
              <svg
                className={styles.page__info__section__diagram__svg_container__svg}
                xmlns="http://www.w3.org/2000/svg" width="78" height="62" viewBox="0 0 78 62" fill="none">
                <rect x="17.4012" y="1.28915" width="60.07" height="60.07" />
                <path d="M0.620802 47.005C0.230278 47.3955 0.230278 48.0287 0.620802 48.4192C1.01133 48.8097 1.64449 48.8097 2.03502 48.4192L0.620802 47.005ZM9.80516 37.8206L0.620802 47.005L2.03502 48.4192L11.2194 39.2348L9.80516 37.8206Z" strokeWidth="1" />
                <circle cx="17.9373" cy="29.4737" r="13.5374" strokeWidth="1" />
              </svg>
            </div>

          </div>
          <div className={styles.page__info__section__text}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error sequi molestiae dolor eaque quisquam ipsam.
          </div>
        </div>

        <div className={styles.page__info__section}>
          <div className={styles.page__info__section__diagram}>

            <div className={styles.page__info__section__diagram__text}>
              MAKE CONNECTIONS
            </div>

            <div className={styles.page__info__section__diagram__svg_container}>
              <svg
                className={styles.page__info__section__diagram__svg_container__svg}
                xmlns="http://www.w3.org/2000/svg" width="94" height="88" viewBox="0 0 94 88" fill="none">
                <rect x="33.0486" y="1.19092" width="60.07" height="60.07" />
                <rect x="16.9786" y="12.2366" width="60.07" height="60.07" />
                <rect x="0.908569" y="26.6583" width="60.07" height="60.07" />
              </svg>
            </div>

          </div>
          <div className={styles.page__info__section__text}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus pariatur vitae officia labore cum odit temporibus, at eum.
          </div>
        </div>

      </div>

      <div className={styles.page__logo}>
        PARA <span className={styles.page__logo__alt}>/</span> LLEL
      </div>

    </div>
  )
};

export default AboutPage;