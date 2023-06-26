// Packages
import DefaultFeed from "@/components/feed/default.feed";
import { Metadata } from "next";
// Imports
import { GetDefaultFeed } from "@/resources/data/feed/getDefaultFeed";

export const metadata: Metadata = {
    title: 'Explore',
    description: 'Explore Page',
}

const ExplorePage = async () => {

    const feedData = await GetDefaultFeed(undefined, undefined, 2);

    return (
        <DefaultFeed initial={feedData}/>
    )
};

export default ExplorePage;