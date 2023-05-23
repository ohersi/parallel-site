// Packages
import axios from 'axios';
import { Metadata } from 'next';
// Imports
import Block from '@/components/block/block';
import { IBlock, IPageProps } from '@/utils/types/types';


// TODO: Use state management to fetch data and populate pages (Redux?)
async function getBlockData(props: IPageProps) {

    const res = await axios.get(`http://localhost:3000/api/v1/blocks/${props.params.id}`);

    console.log('data fetched');

    const data = await res.data as IBlock;

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