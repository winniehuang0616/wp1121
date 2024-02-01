# Run the project

1. Install dependencies
   ```bash
   yarn
   ```
2. Get Pusher credentials
   Please refer to the [Pusher Setup](#pusher-setup) section for more details.

3. Get Github OAuth credentials
   Please refer to the [NextAuth Setup](#nextauth-setup) section for more details.

4. Create `.env.local` file in the project root and add the following content:

   ```text
   POSTGRES_URL=

   PUSHER_ID=
   NEXT_PUBLIC_PUSHER_KEY=
   PUSHER_SECRET=
   NEXT_PUBLIC_PUSHER_CLUSTER=

   AUTH_SECRET=
   AUTH_GITHUB_ID=
   AUTH_GITHUB_SECRET=

   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

5. Start the database
   ```bash
   docker compose up -d
   ```
6. Run migrations
   ```bash
   yarn migrate
   ```
7. Start the development server
   ```bash
   yarn dev
   ```
8. Open http://localhost:3000 in your browser

9. deploy link : https://messenger-six-mu.vercel.app/

# 其他事項

登入
- 密碼要是 8 位數
- 來不及做 error redirect，如果註冊或登入錯誤可以直接幫我改網址回到首要~
- sign in 的時候第一次會重整畫面，不太確定為什麼，希忘 reviewer 大方地再次 sign in 就可以了

聊天室
- 雖然我的新增按鈕沒有做功能，但作業要求的功能 ( 新增聊天室、刪除聊天室 ) 都有實做，在中間的聊天室會抓出所有的使用者，加過聊天室的呈現藍色頭貼 + 刪除按鈕 ; 沒加過的呈現灰色頭貼 + 新增按鈕 + 加入聊天室提示文字，會這樣設計是因為覺得兩者功能是一樣的，所以就把新增聊天室的功能寫進聊天室列表裡面
- search 按鈕按下之後會看到 url 有打上去，但實際上沒有功能，實在是因為我試了很多方式還是拿不到 searchParam，希望 reviewer 大發慈悲給我 pass 嗚嗚，有什麼方法也可以 comment 給我
- 要進入聊天室要點名字或最後一則留言那邊 ( 為了 UI 做成這樣，還請見諒 )

聊天
- 要測試 pusher 建議使用兩種 browser 開起 ( 例如 chrome 和 IE )，不然會因為 cookie 導致使用者被重新 render
- api 打得非常無敵慢我真的很抱歉，但他真的會動

deploy
- 如果要註冊新帳號測試 pusher 可以創兩個就好~因為我 chatroom 忘記做 scrow 了
- 要測試 pusher 建議用不同瀏覽器開比較不會有問題
- 也可以直接登入既有帳號 : winnie-00000000、mary-11111111、bryan-01050105
- 點擊 chatroom 後 ( 要點頭像或名字喔 ) 才會跳出對話畫面，之後才可發送訊息公告收回等等，

