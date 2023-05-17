export interface PageProps {
    params: {
        id: string
    }
};

export interface Channel {
    user_id: number;
    title: string;
    description: string;
    slug: string;
    date_created: string;
    date_updated: string;
    blocks: Block[];
};

export interface Block {
    id: number;
    user: number;
    title: string;
    description: string;
    source_url: string;
    image_url: string;
    date_created: string;
    date_updated: string;
    channels: Channel[];
};
