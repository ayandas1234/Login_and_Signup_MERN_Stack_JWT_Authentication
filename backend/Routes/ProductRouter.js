const ensureAuthenticated = require('../Middlewares/AuthProduct');

const router = require('express').Router(); // create a router intance usig express to create multiple rutes for GET,POST,DELETE,PUT request access

router.get('/', ensureAuthenticated, (req, res) => {
    console.log('------ logged user details ------ ', req.user)
    res.status(200).json([
        {
            name : "mobile",
            price: "1000",
        },
        {
            name : "tv",
            price: "20000",
        },
    ])
});

module.exports = router;