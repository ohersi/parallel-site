import Joi from "joi";

export const validationOptions = {
    abortEarly: false, // Prevents validation from ending after finding the first error, allows it to continue
    allowUnknown: true, // Allows validation to continue even if values not part of the schema
    stripUnknown: true // Removes the unknown elements from objects and arrays
};

// Login user
const loginValidation = Joi.object({
    email: Joi.string().email({ tlds: {allow: false} }).lowercase().required(),
    password: Joi.string().required(),
});

export default loginValidation;