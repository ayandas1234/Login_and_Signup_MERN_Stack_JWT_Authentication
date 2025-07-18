const joi = require('joi');

// signup validation used before signup to check user data is valid or not
const signupValidation = (req, res, next) => {
    // defining schema using joi for upcoming data coming from client , the data are name , email and password they should match the requirement
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required(),
    });

    // validate the schema , data send by client is fullfill the requirement of schema
    const { error } = schema.validate(req.body);

    // sending error message if there is any requirement unfullfiled or not unmatched
    if (error) {
        return res.status(400)
            .json({ message: "Bad Request", error })
    }

    next();
}

// login validaton is checked before login
const loginValidation = (req, res, next) => {
    // defined schema using joi for coming data from cleint side
    const schema = joi.object({
        email: joi.string().required(),
        password: joi.string().min(4).max(100).required(),
    });

    // check if there is mismatched with the existing data or requirement unfullfiled
    const { error } = schema.validate(req.body);

    // sending error message if there is any requirement unfullfiled or not unmatched
    if (error) {
        return res.status(400)
            .json({ message: "Bad Request", error })
    }

    next();
}

module.exports = {
    signupValidation,
    loginValidation
}