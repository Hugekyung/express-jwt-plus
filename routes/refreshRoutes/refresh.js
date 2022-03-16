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

    // 리프레시토큰을 검증하기 전에, 리프레시토큰 db(redis)에서 일치하는 리프레시토큰이 있는지 확인하기
    // redis에 일치하는 리프레시토큰이 있으면 검증
    // 검증 후 유효하면 엑세스토큰 재발급, 만료됐다면 redis서버의 리프레시토큰 제거 후 만료메세지 응답
    const isValidRefresh = JWTAuth.verifyRefreshToken(accessToken, refreshToken);
    console.log(isValidRefresh)
    if (isValidRefresh.result) {
        res.json({ accessToken: isValidRefresh.accessToken });
    } else {
        res.json({ message: isValidRefresh.message });
    }
})

module.exports = RefreshRouter;