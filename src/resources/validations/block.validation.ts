import * as yup from 'yup';

const urlMatch = /^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/is;
const imgMatch = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!%\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)+$/i;

// Create block
const create = yup.object({
    title: yup.string().required("Enter title").max(80),
    description: yup.string().required("Enter description").max(200),
    image_url: yup.string().matches(imgMatch, "Image URL is not valid.").required(),
    source_url: yup.string().matches(urlMatch, "URL is not valid.").required(),
});

// Update block
const update = yup.object({
    title: yup.string().optional(),
    description: yup.string().optional(),
    image_url: yup.string().matches(imgMatch, { message: "Image URL is not valid.", excludeEmptyString: true }).optional(),
    source_url: yup.string().matches(urlMatch, { message: "URL is not valid.", excludeEmptyString: true }).optional(),
});

const blockValidation = {
    create,
    update
};

export default blockValidation;