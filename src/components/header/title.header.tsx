// Packages
import Link from "next/link";
// Imports
import { isChannel, isUser } from "@/resources/helper/checkType";
import { IChannel, IUser } from "@/utils/types/types";
import styles from "@/styles/layout/header.module.scss";

interface IHeaderTitle {
    props: IChannel | IUser | string;
};

const HeaderTitle = ({ props }: IHeaderTitle) => {

    let channelUser = isChannel(props) ? props.user as IUser : undefined;

    return (
        <>

            {
                isChannel(props) ?
                    <div className={styles.header__top__title_container}>

                        <div className={styles.header__top__title_container__row}>
                            <Link href={'/'}>
                                <span className={styles.header__top__title_container__item}>Parallel</span>
                            </Link>
                            <Link href={`/${channelUser?.slug}`}>
                                <span className={styles.header__top__title_container__item}>{channelUser?.full_name}</span>
                            </Link>
                        </div>

                        <Link href={`/${channelUser?.slug}/${props.slug}`}>
                            <span className={styles.header__top__title_container__item__title}>{props.title}</span>
                        </Link>
                    </div>
                    :
                    isUser(props) ?
                        <div className={styles.header__top__title_container}>
                            <Link href={'/'}>
                                <span className={styles.header__top__title_container__item}>Parallel</span>
                            </Link>
                            <Link href={`/${props.slug}`}>
                                <span className={styles.header__top__title_container__item__title}>{props.full_name}</span>
                            </Link>
                        </div>
                        :
                        <div className={styles.header__top__title_container}>
                            <Link href={'/'}>
                                <span className={styles.header__top__title_container__item}>Parallel</span>
                            </Link>
                            <span className={styles.header__top__title_container__item__title}>{props}</span>
                        </div>
            }

        </>
    )
};

export default HeaderTitle;