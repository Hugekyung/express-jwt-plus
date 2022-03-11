require('dotenv').config();
const JWT = require('jsonwebtoken');

class JWTAuth {
    static createAccessToken({ payload }) {
        const accessToken = JWT.sign({ userId: payload }, process.env.ACCESS_SECRET_KEY, { expiresIn: '1m'})
        return accessToken;
    }

    static createRefreshToken() {
        const RefreshToken = JWT.sign({}, process.env.REFRESH_SECRET_KEY, { expiresIn: '5m'})
        return RefreshToken;
    }

    static verifyAccessToken(accessToken) {
        const isValid = jwt.Verify(accessToken, process.env.ACCESS_SECRET_KEY)
        if (!isValid) {
            return false;
        }
        return true;
    }

    static verifyRefreshToken(accessToken, refreshToken) {
        const isValid = jwt.Verify(refreshToken, process.env.REFRESH_SECRET_KEY)
        if (!isValid) {
            return { status: 'Bad', message: 'Expired RefreshToken' }
        }
        if (isValid) {
            // 엑세스토큰 재발급
            const payload = jwt.decode(accessToken);
            const newAccessToken = jwt.sign({ userid: payload.userid }, process.env.ACCESS_TOKEN, { expiresIn: '1m' });
            return { status:'OK', accessToken: newAccessToken };
        }
    }
}

module.exports = JWTAuth;