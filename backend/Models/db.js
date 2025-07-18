const mongoose = require('mongoose');

// accessing MongoDB Connection String from enviornment file
const mongo_url = process.env.MONGO_CONN;

// Connecting with MongoDB
mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected....');
    })
    .catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    })