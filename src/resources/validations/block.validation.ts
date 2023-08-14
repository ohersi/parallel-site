import * as yup from 'yup';

const urlMatch = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\\=]*)$/;
const imgMatch = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)+$/;

const combinedRegex = new RegExp('(?!' + urlMatch.source + ')|(?:' + imgMatch.source + ')');

// Create block
const create = yup.object({
    title: yup.string().required().max(80),
    description: yup.string().required().max(200),
    image_url: yup.string().matches(imgMatch, "Image URL is not valid.").required(),
    source_url: yup.string().matches(combinedRegex, "URL is not valid.").required(),
});

// Update block
const update = yup.object({
    title: yup.string().optional(),
    description: yup.string().optional(),
    image_url: yup.string().matches(imgMatch, { message: "Image URL is not valid.", excludeEmptyString: true }).optional(),
    source_url: yup.string().matches(combinedRegex, { message: "URL is not valid.", excludeEmptyString: true }).optional(),
});

const blockValidation = {
    create,
    update
};

export default blockValidation;