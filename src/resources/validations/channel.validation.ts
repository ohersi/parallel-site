import * as yup from 'yup';

// Create channel
const create = yup.object({
    title: yup.string().required().max(80),
    description: yup.string().required().max(200),
});

// Update channel
const update = yup.object({
    title: yup.string().optional(),
    description: yup.string().optional(),
});

const channelValidation = {
    create, 
    update
};

export default channelValidation;