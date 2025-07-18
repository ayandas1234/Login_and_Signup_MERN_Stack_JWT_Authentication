const { required } = require("joi");
const mongoose = require("mongoose");

// create an Schema Instance
const Schema = mongoose.Schema;

// Define a Schema which is basically a blueprint
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }

});

// Creates a Mongoose model called UserModel, which links the defined schema (UserSchema) to the MongoDB collection named users

// The first time you insert a document with this model, Mongoose will automatically create the 'users' collection in MongoDB if it does not exist yet.
const UserModel = mongoose.model('users', UserSchema);

//
module.exports = UserModel;