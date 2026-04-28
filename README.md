# wander-admin

`wander-admin` is the frontend project of wander system.

Tech stack:

- Vue 3
- Vite
- Vue Router
- Pinia
- Axios

## 1. Run locally

```bash
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## 2. Build

```bash
npm run build
```

## 3. Backend proxy

Configured in `vite.config.js`:

- `/api` -> `http://127.0.0.1:8080/wander-hub`

If backend address changes, update proxy target.

## 4. Login account

- username: `admin`
- password: `123456`

## 5. Core pages

- `/login`: login page
- `/notes`: note create/list
- `/ai`: ai prompt and response

## 6. API contract

All interfaces return unified response:

```json
{
  "success": true,
  "message": "OK",
  "data": {}
}
```

### 6.1 Login

- Method: `POST`
- Path: `/api/auth/login`
- Request:

```json
{
  "username": "admin",
  "password": "123456"
}
```

- Response data:

```json
{
  "token": "xxxx",
  "username": "admin",
  "nickname": "管理员"
}
```

### 6.2 Create note

- Method: `POST`
- Path: `/api/notes`
- Header: `Authorization: Bearer <token>`
- Request:

```json
{
  "title": "note title",
  "content": "note content"
}
```

### 6.3 List notes

- Method: `GET`
- Path: `/api/notes`
- Header: `Authorization: Bearer <token>`

### 6.4 AI chat

- Method: `POST`
- Path: `/api/ai/chat`
- Header: `Authorization: Bearer <token>`
- Request:

```json
{
  "prompt": "请介绍一下wander系统"
}
```
