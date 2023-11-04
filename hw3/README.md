# 生傳四-黃韻文

## Running the app

1. Install dependencies

```bash
yarn install
```

2. Create a `.env.local` file in the root of the project and add a valid Postgres URL. To get a Postgres URL, follow the instructions [here](https://ric2k1.notion.site/Free-postgresql-tutorial-f99605d5c5104acc99b9edf9ab649199?pvs=4).

```bash
POSTGRES_URL="postgres://postgres:postgres@localhost:5432/twitter"
```

3. Run the migrations

```bash
yarn migrate
```

4. Start the app

```bash
yarn dev
```

## 有些 api 速度比較慢，還請同學稍後 ><
## 希望大家都能先登入再使用拉~


