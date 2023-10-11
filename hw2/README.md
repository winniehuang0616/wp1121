# hw2-黃韻文

### 1. setup backend `.env`

Start by copying the `.env.example` file to `.env`.

```bash
cd backend
cp .env.example .env
```

應該長得像這樣 : 

```bash
PORT=8000
MONGO_URL="mongodb+srv://<username>:<password>@<cluster>.example.mongodb.net/?retryWrites=true&w=majority"
```

### 2. setup frontend `.env`

Start by copying the `.env.example` file to `.env`.

```bash
cd frontend
cp .env.example .env
```
應該長得像這樣 :
```bash
VITE_API_URL="http://localhost:8000/api"
```

### 3. start the backend server

```bash
cd backend
yarn dev
```

### 4. start the frontend server

```bash
cd frontend
yarn dev
```

### 補充一下
我的歌曲內容修改方式是直接點擊修改，放開後會自動儲存並更新 ( 類似 trello-clone list 的那樣 )，那因為 url 會先跳出新分頁，可能會以為不能改，但在回去原本的畫面其實也是可以改的喔
此外，我的新增歌曲到其他清單是放在 Append + 那邊，那個 + 按下去會跳出對話框即可新增至其他清單~