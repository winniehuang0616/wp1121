# hw1 生傳四黃韻文

### 1. install packages

```bash
cd backend
yarn
```

### 2. enter mongodb password in .env in backend folder

```bash
cd backend
MONGO_URL = "your password"
```

### 3. run the server

```bash
yarn start
```

### 4. Open the frontend

Open `frontend/index.html` by clicking it in your file explorer.
Or if you're on ubuntu, you can run the following command to open it in your browser.

```bash
cd frontend
xdg-open index.html
```

If you're on macOS, you can run the following command to open it in your browser.

```bash
cd frontend
open index.html
```

## 5. advanced requirments

```首頁 filter 功能
- 分成兩類 : 主題 ( 學業、人際、社團 ) 和心情 ( 快樂、難過、生氣 )
- 兩個分類器都是 optional，選好後按下篩選即會過濾出相符的日記本並顯示於畫面上
- 想換換看組合可以繼續篩選
- 想回到原本的狀態可以把篩選器選回標題並按下查詢，或直接重整畫面
```

```日期更改與偵錯功能
- 錯誤偵查包含 : 年份存在、月份存在、日期不超出每月最大日期
- 二月最大日期會跟著當年是否為閏年調整
- 輸入錯誤日期會 alert()，然後改回預設日期
- 輸入格式錯誤不會 alert()，會幫你自動調整成正確的格式 ><
- 可以試試看 : 2023.9.32 、 2020.02.29、2023/09/23，當然，這些只是舉例，也可以輸入你喜歡的日子看看
```

## Linting

```bash
cd frontend && yarn lint
cd ..
cd backend && yarn lint
```

