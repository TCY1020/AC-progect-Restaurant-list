# AC-project-Restaurant-
**這是使用 Node.js + Express + MongoDB + Mongoose 與 RESTful架構風格設計的一個餐廳網站。**
## 專案畫面
![MyImage](./public/img/Recording%202023-06-06%20at%2020.47.08.gif)
## Features - 產品功能
+ 查看所以餐廳
+ 使用者可以點擊任一餐廳，查看更多餐廳資訊，如地址、電話與簡介
+ 使用者可以依照中文名稱、英文名稱與餐廳類別進行搜尋
+ 搜尋失敗提醒
+ Edit、Delete功能
+ 新增餐廳功能
+ 可以依不同方式排序餐廳清單
+ Passport 打造註冊功能
+ Facebook 第三方登入
+ 使用 bcrypt 保護使用者的密碼
## Environment SetUp - 環境建置
+ Node.js v14.16.0
+ Express 4.16.4
+ Express-Handlebars 3.0.0
+ Bootstrap 5.1.3
+ Font-awesome 6.4.0
+ dotenv: 16.0.3
+ mongoose: 5.9.7
+ body-parser: 1.20.2
+ express: 4.16.4
+ passport: 0.6.0
+ passport-local: 1.0.0
+ passport-facebook: 3.0.0
+ connect-flash: 0.1.1
## Installing - 專案安裝流程
1. 請先確認有安裝 node.js 與 npm
2. 創造一個專案資料夾，打開您的 terminal，使用`cd`指令進入您剛創建的資料夾
3. Clone 此專案至本機電腦將專案 clone 到本地
```
https://github.com/TCY1020/AC-progect-Restaurant-list.git
```
4. 在本地開啟之後，透過終端機進入資料夾，輸入：
```
npm install
```
5. 安裝nodemon
```
npm install nodemon
```
6. 在專案資料夾內新增一個.env檔案，並輸入 MongoDB 你的連線字串
```
MONGODB_URI = "<你的連線字串>"
```
7. 製作種子資料:
```
npm run seed
```
8. 啟動伺服器
```
npm run dev 
```
9. 出現以下字樣表示伺服器連線成功
```
Restaurant-list is running on http://localhost:3000
mongodb connected!
```
10. 開啟瀏覽器，輸入以下網址，使用本專案
```
http://localhost:3000 
```
## Contributor - 專案開發人員
[TCY](http://dev.nodeca.com)
