require("dotenv").config();
const JWT = require("jsonwebtoken");

class JWTAuth {
    static createAccessToken(payload) {
        const accessToken = JWT.sign(
            { userId: payload },
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: "3m" },
        );
        return accessToken;
    }

    static createRefreshToken() {
        const RefreshToken = JWT.sign({}, process.env.REFRESH_SECRET_KEY, {
            expiresIn: "10m",
        });
        return RefreshToken;
    }

    static verifyAccessToken(accessToken) {
        try {
            const isValid = JWT.verify(
                accessToken,
                process.env.ACCESS_SECRET_KEY,
            );
            return { result: true, userInfo: isValid.userId };
        } catch (err) {
            console.log("error msg >>", err); //  TokenExpiredError: jwt expired
            return { result: false, message: err.message };
        }
    }

    static verifyRefreshToken(accessToken, refreshToken) {
        try {
            const isValid = JWT.verify(
                refreshToken,
                process.env.REFRESH_SECRET_KEY,
            );
            console.log(isValid);
            if (isValid) {
                // 엑세스토큰 재발급
                const payload = JWT.decode(accessToken);
                const newAccessToken = JWT.sign(
                    { userId: payload.userId },
                    process.env.ACCESS_SECRET_KEY,
                    { expiresIn: "3m" },
                );
                return { result: true, accessToken: newAccessToken };
            }
        } catch (err) {
            return { result: false, message: err.message };
        }
    }
}

module.exports = JWTAuth;
