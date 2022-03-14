const JWTAuth = require('../../util/jwt')

module.exports = (req, res, next) => {
    const accessToken = req.header('X-Auth-Token');
    // 엑세스토큰 검증
    const isValid = JWTAuth.verifyAccessToken(accessToken);
    console.log(isValid);
    if (isValid.result) {
        req.user = isValid.userInfo;
        next();
    } else {
        // 이 코드가 딱히 동작하지 않고 다음 미들웨어로 넘어가는 듯..
        return res.json({ message: isValid.message }); // 이 메세지를 받은 클라이언트는 리프레시토큰을 담아 다시 /users/refresh에 요청해야 한다.
    }
}