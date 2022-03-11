# express-jwt-plus

## `accessToken과 refreshToken을 활용한 JWT Authentication 구현`
<br/>
설계

- express 서버
- react 클라이언트
- mongoDB
- redis

### 구현 단계

- POST /login 기능 구현 ✅
    - Array로 임시구현
    - DB → UserList
    - redis → RefreshTokenList
- /util/jwt JWTAuth 함수 구현 ✅
    - createAccessToken(payload: 유저 고유 Id)
    - createRefreshToken(payload 없음)

<br/>

- GET users/private
    - 토큰 검증이 필요한 경로로 요청이 들어올 때(header에 엑세스토큰)
    - JWTcheck 미들웨어 구현 → /users/private 경로의 미들웨어로 등록
        - 엑세스토큰 검증(JWTAuth) → 문제없으면 next() → 만료된 경우 expired 메세지 응답
    
    ```
    headers: {
        'X-Auth-Token': accessToken,
    }
    ```
    
- POST /refresh
    - 엑세스토큰 만료 메세지를 응답받은 경우, 클라이언트에서 엑세스토큰&리프레시토큰을 헤더에 담아 다시 요청
    - 리프레시토큰 검증(JWTAuth)
        - RefreshTokenList에 클라에서 받은 리프레시토큰이 존재하는지 확인 → 있으면 리프레시토큰 검증 / 없으면 토큰이 없다는 메세지 응답
        - 유효하다면 엑세스토큰 재발급(엑세스토큰을 디코딩해서 유저고유Id를 추출, payload에 담아 엑세스토큰 재발급) 후 응답
        - 만료되었다면 expired 메세지 응답
    
    ```
    headers: {
        'X-Auth-Token': accessToken,
        'Refresh-Token': refreshToken
    }
    ```