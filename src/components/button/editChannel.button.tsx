import { setIsOpen } from '@/store/isModalOpenSlice';
import { useAppDispatch, useAppSelector } from '@/store';

// Opens modal
const EditChannelButton = () => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    return (
        <>
            <div>
                <button onClick={() => { dispatch(setIsOpen(!isOpen)) }}>Edit Channel</button>
            </div>
        </>
    )
};

export default EditChannelButton;