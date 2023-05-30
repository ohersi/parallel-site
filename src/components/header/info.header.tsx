import { IChannel } from "@/utils/types/types";

/* 
 Header info consists of:
    info - User or channel information text
    action - followers/following for user & share for channel
    view - filter user by channels/blocks/all
    connect - connect users channel with another
*/


interface IHeaderInfo {
    props: IChannel | any; // any placeholder - replace with User interface
};

 const HeaderInfo = ({ props }: IHeaderInfo) => {
    
    return (
            <h1>{props.description}</h1>
    )
};

export default HeaderInfo;