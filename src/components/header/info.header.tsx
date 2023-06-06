import { IChannel } from "@/utils/types/types";
import Link from "next/link";
import { IPageProps } from "@/utils/types/types";

/* 
 Header info consists of:
    info - User or channel information text
    action - followers/following for user & share for channel
    view - filter user by channels/blocks/all
    connect - connect users channel with another
*/


interface IHeaderInfo {
    props: any; // any placeholder - replace with User interface
    params?: string;
};

const HeaderInfo = ({ props, params }: IHeaderInfo) => {

    return (
        <>
            <span>Info</span>
            <div><Link href={`/${params}/followers`}>Followers</Link></div>
            <div><Link href={`/${params}/following`}>Following</Link></div>
            <h1>{props?.description}</h1>
        </>
    )
};

export default HeaderInfo;