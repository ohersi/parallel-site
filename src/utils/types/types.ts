export interface IPageProps {
    params: {
        id: string;
        slug: string;
        userID: string;
        channelID: string;
    }
};

export interface IUser {
    id: number;
    slug: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    avatar: string;
    enabled: boolean;
    locked: boolean;
    role: string;
};

export interface IChannel {
    id: number;
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

export interface IChannelPayload {
    title?: string;
    description?: string;
};

export interface IBlockPayload {
    title?: string;
    description?: string;
    source_url?: string;
    image_url?: string;
};

export interface ISearchResults {
    channel: IChannel;
    blocks: IBlock[];
    total_blocks: number;
}

export enum FORM {
    CHANNEL_CREATE = 'CHANNEL_CREATE',
    CHANNEL_UPDATE = 'CHANNEL_UPDATE',
    BLOCK_CREATE = 'BLOCK_CREATE',
    BLOCK_UPDATE = 'BLOCK_UPDATE',
};

export enum BUTTON {
    CHANNEL_DELETE = 'CHANNEL_DELETE',
    BLOCK_CONNECTION_CREATE = 'BLOCK_CONNECTION_CREATE',
    BLOCK_CONNECTION_DELETE = 'BLOCK_CONNECTION_DELETE',
};

export enum SEARCH {
    CHANNEL = 'CHANNEL',
    BLOCK = 'BLOCK',
    USER = 'USER',
};