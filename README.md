# 114（上）網路程式設計期末專題
## 個人期末專題－線上活動管理 CRUD 系統

## 一、專案簡介
本專題為「線上活動管理系統」，使用者可透過網頁介面新增、查詢、修改與刪除活動資料。
系統採用前後端分離架構，前端負責使用者操作與畫面呈現，後端提供 RESTful API 並與 MongoDB 資料庫進行資料存取，完整實作 CRUD（Create / Read / Update / Delete）功能。


## 二、專案目標
- 建立一套具備完整 CRUD 功能的 Web 系統
- 實作前端與後端 API 串接
- 使用 MongoDB 作為資料庫，設計合適的資料結構
- 提供清楚的文件說明、系統架構圖與 Demo 影片
- 熟悉現代化前後端開發流程與版本控制

## 三、技術選型與原因
### 前端（Frontend）
- React + Vite：採用元件化開發，利於維護與重用
- React Router：提供頁面導覽（列表頁 / 詳細頁）
- Axios：與後端 API 進行資料串接
- Tailwind CSS：快速打造一致且具 RWD 的使用者介面

### 後端（Backend）
- Node.js + Express：建立 RESTful API
- Mongoose：作為 MongoDB ODM，定義資料模型與驗證
- dotenv / cors：管理環境變數與跨來源請求

### 資料庫（Database）
- MongoDB：以文件導向資料結構儲存活動資料，符合 CRUD 操作需求

## 四、系統功能說明（CRUD）
### 活動管理功能
- 新增活動（Create）
- 取得所有活動列表（Read）
- 取得單一活動詳細資料（Read）
- 編輯活動資料（Update）
- 刪除活動資料（Delete）

使用者可透過前端介面完成上述操作，所有資料皆透過後端 API 存取 MongoDB。

## 五、資料庫設計
### Event（活動）集合
```json
{
  "_id": "ObjectId",
  "title": "活動名稱",
  "date": "YYYY-MM-DD",
  "location": "活動地點",
  "quota": 30,
  "status": "open",
  "description": "活動說明",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## 六、API 規格摘要
| 方法 | 路由 | 說明 |
|---|---|---|
| POST | /api/events | 新增活動 |
| GET | /api/events | 取得活動列表 |
| GET | /api/events/:id | 取得單一活動 |
| PUT | /api/events/:id | 更新活動 |
| DELETE | /api/events/:id | 刪除活動 |

所有 API 皆回傳統一格式（success / message / data / error），並妥善處理 HTTP 狀態碼。

詳細 API 規格請見：docs/api-spec.md

## 七、系統架構說明
```
使用者（瀏覽器）
        ↓
   React 前端介面
        ↓（HTTP / JSON）
 Express 後端 API
        ↓
     MongoDB
```

## 八、CRUD 操作流程說明
1. 使用者於前端輸入資料並提交
2. 前端透過 Axios 呼叫後端 API
3. 後端接收請求並執行資料驗證與商業邏輯
4. 透過 Mongoose 存取 MongoDB
5. 將結果以統一格式回傳前端
6. 前端更新畫面並提示操作結果

## 九、設計模式應用（加分項目）
### 後端
- Repository Pattern：將資料存取邏輯集中於 Repository，降低與資料庫的耦合度
- Service Pattern：商業邏輯集中於 Service 層，Controller 僅負責請求與回應
- Singleton Pattern：MongoDB 連線僅建立一次，避免重複連線

### 前端
- Observer Pattern（狀態管理）：使用 Context + useReducer 管理活動狀態，讓多個元件同步更新
- Factory Pattern（表單元件生成）：依欄位型態動態產生對應的輸入元件，提升元件重用性

詳細說明請見：docs/design-patterns.md

## 十、專案目錄結構
```
eventify/
├─ frontend/
├─ backend/
├─ docs/
└─ README.md
```

## 十一、本機安裝與執行方式
### 環境需求
- Node.js 18 以上
- MongoDB（本機安裝）

### 後端啟動
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
後端位址：http://localhost:3001

### 前端啟動
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
前端位址：http://localhost:5173

## 十二、Demo 影片說明
Demo 影片長度約 5–8 分鐘，內容包含：
- 專案架構說明
- CRUD 功能實際操作示範
- API 呼叫展示
- 文件與設計模式說明

## 十三、Git 版本控制
本專案使用 Git 進行版本控制，並至少包含 5 次以上具意義的 commit 紀錄，以呈現完整的開發過程。

## 十四、結論
透過本專題，完成了一套具備前後端整合與完整 CRUD 功能的 Web 系統，並實際應用現代化前端框架、後端 API 設計、資料庫建模與設計模式，達成本課程之學習目標。
    