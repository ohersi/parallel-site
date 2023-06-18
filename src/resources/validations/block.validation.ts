import * as yup from 'yup';

const regMatch = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;


// Create block
const create = yup.object({
    title: yup.string().required().max(80),
    description: yup.string().required().max(200),
    image_url: yup.string().matches(regMatch, "URL is not valid.").required(),
    source_url: yup.string().matches(regMatch, "URL is not valid.").required(),
});

// Update block
const update = yup.object({
    title: yup.string().optional(),
    description: yup.string().optional(),
    image_url: yup.string().matches(regMatch, "URL is not valid.").optional(),
    source_url: yup.string().matches(regMatch, "URL is not valid.").optional(),
});

const blockValidation = {
    create,
    update
};

export default blockValidation;