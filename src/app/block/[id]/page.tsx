// Packages
import { Metadata } from 'next';
// Imports
import Block from '@/components/block/block';
import { IPageProps } from '@/utils/types/types';
import { getBlockData } from '@/resources/data/block/getBlockData';


// Dynamic Metadata for Pages
export const generateMetadata = async (props: IPageProps): Promise<Metadata> => {
    try {
        const block = await getBlockData(props);
        return { title: `${block.title} — Parallel` };
    }
    catch (error: any) {
        return { title: `Error — Parallel` };
    };
};

const BlockPage = async (props: IPageProps) => {

    const block = await getBlockData(props);

    return (
        <>
            <Block block={block} />
        </>
    )
};

export default BlockPage;