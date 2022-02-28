//validation 
const Joi = require('joi')

//registration validation
const registerValidation = (data) => {


    const schema = Joi.object({
    fullname: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    phone_number: Joi.string().length(10).pattern(/^[0-9]+$/),
    password: Joi.string().min(6).max(18).required()
});
    return schema.validate(data)
};

//log-in validation
const loginValidation = (data) => {


    const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});
    return schema.validate(data)
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;