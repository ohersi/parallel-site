interface IHeaderTitle {
    title: string;
};

const HeaderTitle = ({ title }: IHeaderTitle) => {
    return (
        <h1>{title}</h1>
    )
};

export default HeaderTitle;