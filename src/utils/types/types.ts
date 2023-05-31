export interface IPageProps {
    params: {
        id: string
    }
};

export interface IChannel {
    user_id: number;
    title: string;
    description: string;
    slug: string;
    date_created: string;
    date_updated: string;
    blocks: IBlock[];
};

export interface IBlock {
    id: number;
    user: number;
    title: string;
    description: string;
    source_url: string;
    image_url: string;
    date_created: string;
    date_updated: string;
    channels: IChannel[];
};

export interface IUserPayload {
    first_name?: string | undefined;
    last_name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    avatar?: string | undefined;
};
