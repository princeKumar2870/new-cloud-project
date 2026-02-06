const authRouter = require('express').Router();
const {registerUser,loginUser, getMe} = require('../controllers/authController')
const {protect,restrictTo}  = require('../middlewares/authMiddlewares')
authRouter.post('/register',registerUser)
authRouter.post('/login',loginUser)
authRouter.get('/me',protect,restrictTo('patient'),getMe)
module.exports =  authRouter