const { Router } = require('express');
const UserLoginRouter = require('./login');
const UserPrivateRouter = require('./private');
const jwtCheck = require('../../middlewares/auth/jwtCheck');
const UserRouter = Router();


// /users
UserRouter.post('/login', UserLoginRouter);
UserRouter.get('/private', jwtCheck, UserPrivateRouter);

module.exports = UserRouter;