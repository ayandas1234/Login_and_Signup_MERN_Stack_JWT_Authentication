// This File Holds all the Controller Function / Actions like- signup, login, password hashing or encryption

const UserModel = require('../Models/user'); // it is the instance of user file where Schema was defined for what kind of data will be coming from client, in simple using this we will store out data easily in our DB
const bcrypt = require('bcrypt'); // it is the instance of bcrypt , using this we will encrypt our password
const jwt = require('jsonwebtoken'); // it is the instance of jsonwebtoken or in short jwt using this we will generate a token of logged user

// it is the middlewre of signup , using this we will take user data save in DB
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body; // it will fetch the name email and password as objet coming from client as a json or params
        const user = await UserModel.findOne({ email }); // using UserModel instance first check is the user email already exist in the DB

        // if user email already exist in the DB then send a message
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, You can login', success: false });
        }

        // here we create a new user using the UserModel instance with name email and password
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10); // before store this data we hash or encrypt the password for security purpose
        await userModel.save(); // save the user

        // send a success message
        res.status(201)
            .json({ message: 'signup successfully', success: true })
    }
    // send error message if internet connection is weak or any kind of error occured
    catch (err) {
        res.status(500)
            .json({ message: 'Internal Server Error', success: false })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email }); // try to find if user email already in the database or not
        const errorMsg = 'Auth failed email or password is wrong';

        // here we used the reverse condition if user didn't exist then wehave to return the message, if user exist then we will skip this condition
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }

        // 👉 bcrypt.compare() internally hashes the plain-text password using the same salt and algorithm used in the stored hash and then checks if they match
        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }

        // generate jwt token using user.email , user._id and secrect key with the expirey duration 24 hour
        const jwtToken = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        // sending the success message with jwtToken, emai and user.name
        res.status(200)
            .json({ message: 'login successfully', success: true, jwtToken, email, name: user.name })
    }
    catch (err) {
        res.status(500)
            .json({ message: 'Internal Server Error', success: false })
    }
}

module.exports = {
    signup,
    login
}