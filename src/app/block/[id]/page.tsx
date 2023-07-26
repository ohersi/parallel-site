// Packages
import { Metadata } from 'next';
// Imports
import Block from '@/components/block/block';
import { IPageProps } from '@/utils/types/types';
import { getBlockData } from '@/resources/data/block/getBlockData';

// Dynamic Metadata for Pages
export const generateMetadata = async ({ params }: IPageProps): Promise<Metadata> => {
    try {
        let id = parseInt(params.id);
        const block = await getBlockData(id);
        return { title: `${block.title} — Parallel` };
    }
    catch (error: any) {
        return { title: `Error — Parallel` };
    };
};

const BlockPage = async ({ params }: IPageProps) => {

    let id = parseInt(params.id);
    const block = await getBlockData(id);

    return (
        <Block block={block} />
    )
};

export default BlockPage;