// ThisFile Holds all the Routing

const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router(); // create a router intance usig express to create multiple rutes for GET,POST,DELETE,PUT request access

//define the login router
// router.post('/login', (req, res) => {
//     res.send('login success!!')
// })

//define the signup router, before the user data stored in DB first it will go through the validation where it will be checked all the data given by user are matched with the requirement
router.post('/signup', signupValidation, signup)

router.post('/login', loginValidation, login)

module.exports = router;