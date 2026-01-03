# API 規格文件（Eventify）

Base URL：`http://localhost:3001`

統一回應格式：

```json
{
  "success": true,
  "message": "ok",
  "data": { "any": "payload" },
  "error": null
}
```

錯誤時：

```json
{
  "success": false,
  "message": "ValidationError",
  "data": null,
  "error": { "code": "BAD_REQUEST", "details": "title is required" }
}
```

---

## 1) 建立活動（Create）
**POST** `/api/events`

### Body（JSON）
| 欄位 | 型別 | 必填 | 說明 |
|---|---|---|---|
| title | string | ✅ | 活動名稱（1~80字） |
| date | string | ✅ | ISO 日期字串，例如 `2026-01-10` |
| location | string | ✅ | 地點 |
| quota | number | ❌ | 名額（>=1） |
| status | string | ❌ | `draft` / `open` / `closed` |
| description | string | ❌ | 描述 |

### 成功回應 201
`data` 回傳建立的活動物件

---

## 2) 取得所有活動（Read all）
**GET** `/api/events`

### Query（可選）
- `q`：關鍵字搜尋（title/location）
- `sort`：排序欄位（`date` / `createdAt`）
- `order`：`asc` / `desc`

### 成功回應 200
`data.items` 為活動列表、`data.total` 為總數

---

## 3) 取得單筆活動（Read single）
**GET** `/api/events/:id`

### 成功回應 200
`data` 為該活動物件

### 可能錯誤
- 404：找不到活動

---

## 4) 更新活動（Update）
**PUT** `/api/events/:id`

### Body（JSON）
同 Create（可傳部分欄位）

### 成功回應 200
`data` 回傳更新後的活動

---

## 5) 刪除活動（Delete）
**DELETE** `/api/events/:id`

### 成功回應 200
`data`：`{ "deletedId": "..." }`

---

## HTTP Status Code 對照
- 200 OK：一般成功
- 201 Created：新增成功
- 400 Bad Request：資料驗證失敗/格式錯誤
- 404 Not Found：資料不存在
- 500 Internal Server Error：非預期錯誤
