// Packages
import Link from "next/link";
// Imports
import { IChannel, IUser } from "@/utils/types/types";
import styles from "@/styles/layout/header.module.scss";

interface IHeaderTitle {
    props: IChannel | IUser | string;
};

// type guard fn to check if props is instance of IChannel
function isChannel(channel: any): channel is IChannel {
    return (channel as IChannel).user !== undefined;
}

function isUser(user: any): user is IUser {
    return (user as IUser).full_name !== undefined;
}

const HeaderTitle = ({ props }: IHeaderTitle) => {
    return (
        <div className={styles.header__top__title_container}>
            <Link href={'/'}>
                <span className={styles.header__top__title_container__item}>Parallel</span>
            </Link>
            {
                isChannel(props) ?
                    <>
                        <Link href={`/${props.user?.slug}`}>
                            <span className={styles.header__top__title_container__item}>{props.user?.full_name}</span>
                        </Link>
                        <Link href={`/${props.user?.slug}/${props.slug}`}>
                            <span className={styles.header__top__title_container__item__title}>{props.title}</span>
                        </Link>
                    </>
                    :
                    isUser(props) ?
                    <Link href={`/${props.slug}`}>
                        <span className={styles.header__top__title_container__item__title}>{props.full_name}</span>
                    </Link>
                    :
                    <span className={styles.header__top__title_container__item__title}>{props}</span>
            }

        </div>
    )
};

export default HeaderTitle;