const express = require('express');
const { signup, login, getUserData } = require('../controllers/userController');
const fetchUser = require('../middleware/fetchUser');
const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/me', fetchUser, getUserData);

module.exports = userRouter;
