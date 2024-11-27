# 경량 Node.js Alpine 이미지 사용
FROM node:22-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 종속성 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 애플리케이션 코드 복사
COPY . .

# 포트 노출
EXPOSE 3010

# 환경 변수 설정 및 애플리케이션 실행
CMD ["sh", "-c", "PORT=3010 npm start"]
