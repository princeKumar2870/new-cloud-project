const authRouter = require('express').Router();
const {registerUser} = require('../controllers/authController')
authRouter.post('/register',registerUser)
module.exports =  authRouter