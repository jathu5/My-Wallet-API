// import package
const Joi = require('@hapi/joi');

// validate request from signup
const signupValidation = data => {
    const schema = Joi.object({
        name: Joi.string().required().max(50),
        email: Joi.string().required().email(),
        username: Joi.string().required().min(5).max(50),
        password: Joi.string().required().min(8).max(500),
        confirmed: Joi.string().required()
    });
    return schema.validate(data);
};

// validate requests from signin
const emailSignValidation = data => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).max(500)
    });
    return schema.validate(data);
};
const userSignValidation = data => {
    const schema = Joi.object({
        username: Joi.string().required().min(5).max(50),
        password: Joi.string().required().min(8).max(500)
    });
    return schema.validate(data);
};

// export validating function
module.exports = {signupValidation, emailSignValidation, userSignValidation};