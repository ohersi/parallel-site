// Packages
import DefaultFeed from "@/components/feed/default.feed";
import { Metadata } from "next";
// Imports
import { GetDefaultFeed } from "@/resources/data/feed/getDefaultFeed";
import styles from "@/styles/pages/explore.page.module.scss";
import Header from "@/components/header/header";
import HeaderAction from "@/components/header/header.action";
import HeaderInfo from "@/components/header/info.header";
import HeaderTitle from "@/components/header/title.header";

export const metadata: Metadata = {
    title: 'Explore',
    description: 'Explore Page',
}

const ExplorePage = async () => {

    const feedData = await GetDefaultFeed(undefined, undefined, 2);

    return (
        <div className={styles.page}>
            
            <Header
                title={<HeaderTitle props={'Explore'}/>}
                action={<HeaderAction />}
                info={<HeaderInfo props={'Explore'} />}
            />

            <DefaultFeed initial={feedData} />
        </div>
    )
};

export default ExplorePage;