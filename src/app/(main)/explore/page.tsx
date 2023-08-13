// Packages
import { Metadata } from "next";
import { notFound } from "next/navigation";
// Imports
import Header from "@/components/header/header";
import HeaderAction from "@/components/header/header.action";
import HeaderInfo from "@/components/header/info.header";
import HeaderTitle from "@/components/header/title.header";
import DefaultFeed from "@/components/feed/default.feed";
import { GetDefaultFeed } from "@/resources/data/feed/getDefaultFeed";
import styles from "@/styles/pages/explore.page.module.scss";

export const metadata: Metadata = {
    title: 'Explore',
    description: 'Explore Page',
}

const ExplorePage = async () => {

    const feedData = await GetDefaultFeed(undefined, undefined, 2);

    if (!feedData) { notFound() };

    return (
        <div className={styles.page}>

            <Header
                title={<HeaderTitle props={'Explore'} />}
                action={<HeaderAction />}
                info={<HeaderInfo props={'Explore'} />}
            />

            <DefaultFeed initial={feedData} />
        </div>
    )
};

export default ExplorePage;