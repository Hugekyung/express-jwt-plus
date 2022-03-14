const UserRouter = require('./usersRoutes/index');
const RefreshRouter = require('./refreshRoutes/refresh');

module.exports = (server) => {
    server.use("/users", UserRouter);
    server.use("/refresh", RefreshRouter);
}