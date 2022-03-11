const { Router } = require('express');
const UserLoginRouter = require('./usersRoutes/login');
const UserPrivateRouter = require('./usersRoutes/private');
const jwtCheck = require('../middlewares/auth/jwtCheck');
const UserRouter = Router();


// /users/login
UserRouter.post('/login', UserLoginRouter);
UserRouter.get('/private', jwtCheck, UserPrivateRouter);

module.exports = router;