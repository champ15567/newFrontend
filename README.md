tutorial
หากมี docker อยู่ folder นอกสุด ที่มีไฟล์ docker-compose.yml อยู่ สามารถรันได้ด้วยคำสั่งเดียว docker-compose up หากไม่สามารถ run ได้ ให้ใช้ docker-compose up -d --build

หาก run ด้วย docker ไม่ได้
node version 18.16.0
เข้าไปที่ frontend
npm i
npm rundev
เข้าไปที่ backend
npm i
npm rundev

หากรันไม่ได้กรุณาติดตั้ง
backend (install)
npm init --y
npm install typescript ts-node ts-node-dev --save-dev
npx tsc --init
npm i express
npm i @types/express --save-dev
npm i mongoose
npm i @types/mongoose --save-dev
npm i bcrypt
npm i --save-dev @types/bcrypt
npm i jsonwebtoken
npm i --save-dev @types/jsonwebtoken
npm i cors
npm i --save-dev @types/cors
วิธี run ใช้งาน
npm run dev

frontend
npm create vite@latest
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm i axios
npm install react-router-dom
npm install serve --save-dev

วิธี run ใช้งาน
npm run built
npx serve -s dist
