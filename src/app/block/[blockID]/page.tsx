// Packages
import axios from 'axios';
import { Metadata } from 'next';
// Imports
import { Block } from '@/app/interfaces';

interface PageProps {
    params: {
        blockID: string
    }
}

// TODO: Use state management to fetch data and populate pages (Redux?)
async function getBlockData(props: PageProps) {

    const res = await axios.get(`http://localhost:3000/api/v1/blocks/${props.params.blockID}`);

    console.log('data fetched');

    const data = await res.data as Block;

    return data;
}

// Dynamic Metadata for Pages
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {

    const block: Block = await getBlockData(props);

    return { title: `${block.title} — Parallel` };
}

const page = async (props: PageProps) => {

    // database fetching
    const block: Block = await getBlockData(props);

    return (
        <div>
            {JSON.stringify(block)}
        </div>
    )
};

export default page;