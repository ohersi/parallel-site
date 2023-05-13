export interface Channel {
    user_id:      number;
    title:        string;
    description:  string;
    slug:         string;
    date_created: Date;
    date_updated: Date;
    blocks:       Block[];
}

export interface Block {
    id:           number;
    user:         number;
    title:        string;
    description:  string;
    source_url:   string;
    image_url:    string;
    date_created: Date;
    date_updated: Date;
}
