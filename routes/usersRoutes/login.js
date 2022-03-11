const bcrypt = require('bcrypt');
const JWTAuth = require('../../util/jwt');

// mongoDB & hashpassword로 바꾸기
userInfoList = [{
    userId: 1, // 유저 고유아이디 uuid로 바꾸기
    email: "test@example.com",
    password: "1234" 
}];

RefreshTokenList = [];

// 유저 로그인
module.exports = (req, res) => {
    const { email, password } = req.body;

    // 해당 유저가 존재하는지 확인(db 조회)
    const userIndex = userInfoList.findIndex(info => info.email === email)
    const user = userInfoList[userIndex];

    // 유저가 존재한다면 -> 패스워드 검증 -> 패스워드 일치/불일치에 따른 응답
    if (user) {
        if (user.password === password) {
            // accessToken & refreshToken 발급
            const payload = user.userId;
            const accessToken = JWTAuth.createAccessToken({ payload });
            const refreshToken = JWTAuth.createRefreshToken();

            RefreshTokenList.push(refreshToken);

            // refreshToken은 리스트(임시 redis)에 저장 후 둘다 응답
            res.json({
                accessToken,
                refreshToken
            })
        } else {
            res.json({ status: 'Bad', message: 'Invalid password ..'});
        }
    } 
    // 유저가 없다면 -> 에러 메세지 응답
    else {
        res.json({ status: 'Bad', message: 'not matched user info ... please sign up'});
    }
}