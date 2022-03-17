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

- GET users/private ✅
    ```
    headers: {
        'X-Auth-Token': accessToken,
    }
    ```
    - 토큰 검증이 필요한 경로로 요청이 들어올 때(header에 엑세스토큰)
    - JWTcheck 미들웨어 구현 → /users/private 경로의 미들웨어로 등록
        - 엑세스토큰 검증(JWTAuth) → 문제없으면 next() → 만료된 경우 expired 메세지 응답
    
    
- POST /refresh ✅
    ```
    headers: {
        'X-Auth-Token': accessToken,
        'Refresh-Token': refreshToken
    }
    ```
    - 엑세스토큰 만료 메세지를 응답받은 경우, 클라이언트에서 엑세스토큰&리프레시토큰을 헤더에 담아 다시 요청
    - 리프레시토큰 검증(JWTAuth)
        - RefreshTokenList에 클라에서 받은 리프레시토큰이 존재하는지 확인 → 있으면 리프레시토큰 검증 / 없으면 토큰이 없다는 메세지 응답
        - 유효하다면 엑세스토큰 재발급(엑세스토큰을 디코딩해서 유저고유Id를 추출, payload에 담아 엑세스토큰 재발급) 후 응답
        - 만료되었다면 expired 메세지 응답
    - `추가할 부분`
        - 리프레시토큰을 검증하기 전에, 리프레시토큰 db(redis)에서 일치하는 리프레시토큰이 있는지 확인하기
        - redis에 일치하는 리프레시토큰이 있으면 검증
        - 검증 후 유효하면 엑세스토큰 재발급, 만료됐다면 redis서버의 리프레시토큰 제거 후 만료메세지 응답
        - 리프레시토큰을 담아 요청할 때 헤더가 아닌 쿠키에 담는 방식으로 바꾸기(서버 측에서 cookie옵션으로 httpOnly를 설정하기)