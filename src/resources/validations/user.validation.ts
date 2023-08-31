import * as yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(yup);

const imgMatch = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)+$/;

// Create user
const create = yup.object({
    first_name: yup.string().required("Enter first name").max(30),
    last_name: yup.string().required("Enter last name").max(30),
    email: yup.string().email().lowercase().required("Enter email address"),
    password: yup.string().password(),
    confirmPassword: yup.string().required("Enter password").oneOf([yup.ref("password")], "Password does not match"),
    avatar: yup.string().matches(imgMatch, "URL is not valid.").required(),
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
    avatar: yup.string().matches(imgMatch, { message: "URL is not valid.", excludeEmptyString: true }).optional(),
})

// Login user
const login = yup.object({
    email: yup.string().email().lowercase().required("Enter email address"),
    password: yup.string().required("Enter password"),
});

const userValidation = {
    create,
    update,
    login
};

export default userValidation;