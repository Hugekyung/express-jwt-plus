require('dotenv').config();
const JWT = require('jsonwebtoken');

class JWTAuth {
    static createAccessToken({ payload }) {
        const accessToken = JWT.sign({ userId: payload }, process.env.ACCESS_SECRET_KEY, { expiresIn: '3m'})
        return accessToken;
    }

    static createRefreshToken() {
        const RefreshToken = JWT.sign({}, process.env.REFRESH_SECRET_KEY, { expiresIn: '10m'})
        return RefreshToken;
    }

    static verifyAccessToken(accessToken) {
        try {
            const isValid = JWT.verify(accessToken, process.env.ACCESS_SECRET_KEY)
            return { result: true, userInfo: isValid.userId };
        } catch (err) {
            console.log("error msg >>", err); //  TokenExpiredError: jwt expired
            return { result: false, message: err.message };
        }
    }

    static verifyRefreshToken(accessToken, refreshToken) {
        const isValid = JWT.verify(refreshToken, process.env.REFRESH_SECRET_KEY)
        if (!isValid) {
            return { status: 'Bad', message: 'Expired RefreshToken' }
        }
        if (isValid) {
            // 엑세스토큰 재발급
            const payload = JWT.decode(accessToken);
            const newAccessToken = JWT.sign({ userid: payload.userid }, process.env.ACCESS_TOKEN, { expiresIn: '3m' });
            return { status:'OK', accessToken: newAccessToken };
        }
    }
}

module.exports = JWTAuth;