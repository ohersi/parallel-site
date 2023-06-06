
// TODO: Props will be channel id
type Props = {}

const EditChannelButton = (props: Props) => {
    return (
        <>
            <div>
                <button onClick={() => console.log('edit channel')}>Edit Channel</button>
            </div>
        </>
    )
};

export default EditChannelButton;