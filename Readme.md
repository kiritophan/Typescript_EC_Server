###
-Khởi chạy dự án node:

Setup node: npm init

-Tải express // Framework của node js để build server

Setup express: // Type của express cho typescript

npm install express

npm i --save-dev @types/express

Setup ts-node:  // Thư viện giúp chạy trực tiếp file ts ra không cần build file js 

npm install -D ts-node or npm install -D ts-node --save-dev

Setup nodemon: 

npm i -D nodemon

Setup dotenv

npm i dotenv


### Tạo mô hình MVC

- Tạo version api
v1: version 1
(/apis/v1/users)

## 1 TypeORM
- Type ORMS
- npm i typeorm mysql reflect-metadata --save

## 2 Prisma

- npm i prisma
- npm i @prisma/client
- Setup path schema.prisma in package.json =>  

"prisma": {
    "schema": "./src/prisma/schema.prisma"
}

- Setup create database, client:

"db": "prisma db push",
"client": "prisma generate"

### Mail google

npm i @types/nodemailer
npm i mailgen

### JWT

npm i jsonwebtoken