// Packages
import Link from "next/link";
// Imports
import { IChannel, IUser } from "@/utils/types/types";
import styles from "@/styles/layout/header.module.scss";

/* 
 Header info consists of:
    info - User or channel information text
    action - followers/following for user & share for channel
    view - filter user by channels/blocks/all
    connect - connect users channel with another
*/

interface IHeaderInfo {
    props: any;
    params?: string;
};

const HeaderInfo = ({ props, params }: IHeaderInfo) => {

    return (
        <div className={styles.header__info}>
            <div className={styles.header__info__title}>Info</div>
            {
                props?.description ?
                    <p>{props.description}</p>
                    : <p>&mdash;</p>
            }
            <div className={styles.header__info__buttons}>
                <div><Link href={`/${params}/followers`}>Followers</Link></div>
                <div><Link href={`/${params}/following`}>Following</Link></div>
            </div>
        </div>
    )
};

export default HeaderInfo;