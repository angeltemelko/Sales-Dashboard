import { Joi } from 'express-validation';

export const RegisterValidation = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string()
        .required()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
    password_confirmed: Joi.string().required(),
});

export const LoginValidation = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
});
