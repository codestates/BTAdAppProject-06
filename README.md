# Connecting


## 요구 환경
- yarn v1.22
- node v14+

## Backend 실행
```
# backend 폴더로 이동
$ cd dapp-backend

# 의존성 설치
$ npm install

# 실행
$ node app.js
```

## Frontend 실행
```
# frontend 폴더로 이동
$ cd dapp-frontend

# 의존성 설치
$ yarn install

# 실행 (안드로이드)
$ yarn android
```

## 디렉토리 구조

```bash
.
├── dapp-backend/
│   ├── models/                - DB에서 읽어오는 객체 폴더
│   └── routes/                - API 라우팅 정의 폴더
│ 
├── dapp-frontend/
│   ├── android/               - 안드로이드 프로젝트 폴더 (빌드용)
│   ├── artifacts/             - ABI 등 타입 및 인터페이스 관련 폴더
│   ├── components/            - 컴포넌트
│   ├── entities/              - Realm 객체 저장 폴더
│   ├── ios/                   - iOS 프로젝트 폴더 (빌드용)
│   ├── pages/                 - 페이지 컴포넌트 (Route와 1:1 관계)
│   ├── providers/             - 커스텀 Provider
│   └── utils/                 - 유틸리티 함수 모음
│ 
├── truffle/
│   ├── contracts/             - 컨트랙트 파일
│   ├── migrations/            - truffle migration 스크립트
│   └── test/                  - test 파일
```
