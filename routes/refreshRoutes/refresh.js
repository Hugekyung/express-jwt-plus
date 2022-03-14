const { Router } = require('express');
const JWTAuth = require('../../util/jwt')

const RefreshRouter = Router();

RefreshRouter.post("/", (req, res) => {
    const accessToken = req.header('X-Auth-Token');
    const refreshToken = req.header('Refresh-Token');

    // refreshToken이 있으면, 토큰이 유효한지 확인
    // 유효하면 엑세스토큰 재발급 리턴
    // 만료되었다면 refreshToken expired 리턴
    if (!refreshToken) {
        res.json({ message: "refreshToken expired"});
    }

    const isValidRefresh = JWTAuth.verifyRefreshToken(accessToken, refreshToken);
    console.log(isValidRefresh)
    if (isValidRefresh.result) {
        res.json({ accessToken: isValidRefresh.accessToken });
    } else {
        res.json({ message: isValidRefresh.message });
    }
})

module.exports = RefreshRouter;