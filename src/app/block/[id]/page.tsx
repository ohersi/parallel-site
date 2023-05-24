// Packages
import { Metadata } from 'next';
// Imports
import Block from '@/components/block/block';
import { IBlock, IPageProps } from '@/utils/types/types';

async function getBlockData(props: IPageProps) {

    const res = await fetch(`http://localhost:3000/api/v1/blocks/${props.params.id}`, {
        next: { revalidate: 10 },
    });

    const data = await res.json() as IBlock;

    return data;
}

// Dynamic Metadata for Pages
export const generateMetadata = async (props: IPageProps): Promise<Metadata> => {

    const block: IBlock = await getBlockData(props);

    return { title: `${block.title} — Parallel` };
}

const BlockPage = async (props: IPageProps) => {

    // database fetching
    const block: IBlock = await getBlockData(props);

    return (
        <>
            <Block block={block} />
        </>
    )
};

export default BlockPage;