import * as yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(yup);

const regMatch = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

// Create user
const create = yup.object({
    first_name: yup.string().required().max(30),
    last_name: yup.string().required().max(30),
    email: yup.string().email().lowercase().required(),
    password: yup.string().password(),
    avatar: yup.string().matches(regMatch, "URL is not valid.").required(),
});

// Update user
const update = yup.object({
    first_name: yup.string().optional(),
    last_name: yup.string().optional(),
    email: yup.string().email().optional(),
    password: yup.string().optional()
        .test((val, ctx) => {
            // Null
            if (val === undefined) return true;
            // Error if either 0 or greater than 8
            if (val.length > 0 && val.length < 8) return ctx.createError({ message: 'Must be greater than 8 characters' });
            // At least 1 lowercase
            if (val.length !== 0 && !val.match(/[a-z]/g)) return ctx.createError({ message: 'Must contain at least 1 lowercase character' });
            // At least 1 uppercase
            if (val.length !== 0 && !val.match(/[A-Z]/g)) return ctx.createError({ message: 'Must contain at least 1 uppercase character' });
            // At least 1 number
            if (val.length !== 0 && !val.match(/[0-9]/g)) return ctx.createError({ message: 'Must contain at least 1 number' });
            // At least 1 symbol
            if (val.length !== 0 && !val.match(/[^a-zA-Z0-9\s]/g)) return ctx.createError({ message: 'Must contain at least 1 symbol' });
            // Valid if 0 or greater than 8
            return val.length === 0 || val.length >= 8;
        }),
    avatar: yup.string().matches(regMatch, { message: "URL is not valid.", excludeEmptyString: true }).optional(),
})

// Login user
const login = yup.object({
    email: yup.string().email().lowercase().required(),
    password: yup.string().required(),
});

const userValidation = {
    create,
    update,
    login
};

export default userValidation;