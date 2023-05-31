import * as yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(yup);

// Create user
const create = yup.object({
    first_name: yup.string().required().max(30),
    last_name: yup.string().required().max(30),
    email: yup.string().email().lowercase().required(),
    password: yup.string().password(),
    avatar: yup.string().required(),
});

// Update user
const update = yup.object({
    first_name: yup.string().optional(),
    last_name: yup.string().optional(),
    email: yup.string().email().optional(),
    password: yup.string().optional(),
    avatar: yup.string().optional(),
})

// Login user
const login = yup.object({
    email: yup.string().email().lowercase().required(),
    password: yup.string().required(),
});


export default { create, update, login };