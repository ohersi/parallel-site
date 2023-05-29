// Packages
import { Metadata } from 'next';
// Imports
import Block from '@/components/block/block';
import { IPageProps } from '@/utils/types/types';
import { getBlockData } from '@/data/getBlockData';


// Dynamic Metadata for Pages
export const generateMetadata = async (props: IPageProps): Promise<Metadata> => {

    const block = await getBlockData(props);

    return { title: `${block.title} — Parallel` };
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