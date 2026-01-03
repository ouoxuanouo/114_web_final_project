# 設計模式加分說明（Eventify）

本專案刻意在前後端各放入至少一種設計模式並於程式碼中落實，方便在報告中作為加分段落。

---

## 後端設計模式

### 1) Repository Pattern（資料存取抽象層）
**目的**：將「資料庫存取」與「商業邏輯」拆開，避免 Controller 直接碰 DB。

- `repositories/EventRepository.js`
  - 專責與 Mongoose Model 溝通（find、create、update、delete）
- 優點
  - 更容易單元測試（可 mock repository）
  - 之後換資料庫（或加 cache）也比較好改

### 2) Service Pattern（商業邏輯層）
**目的**：集中處理規則，例如：欄位修整、預設值、錯誤轉換、排序與搜尋等。

- `services/EventService.js`
  - 透過 repository 完成 CRUD
  - 並負責輸入清理（trim）、預設 status、查詢排序等

### 3) Singleton Pattern（資料庫連線）
**目的**：避免在多處重複建立 MongoDB 連線，統一由單一模組管理連線狀態。

- `db/mongo.js`
  - `connectMongo()` 使用模組層級變數記住 connection
  - 若已連線就直接回傳

---

## 前端設計模式

### 1) Observer Pattern（狀態管理：Context + useReducer）
**目的**：集中管理 events 狀態，讓多個元件（列表、搜尋列、表單、Toast）能「觀察」同一份狀態變化。

- `src/state/eventsStore.jsx`
  - `EventsProvider` 提供狀態
  - `useEvents()` 讓各元件訂閱（observer）資料與 action
- 優點
  - 避免 prop drilling
  - UI 更新一致、可預測

### 2) Factory Pattern（表單欄位元件生成）
**目的**：用一個工廠函式依欄位型別產生對應輸入元件，減少重複 UI。

- `src/components/form/FieldFactory.jsx`
  - `createField(type, props)` 回傳 Input/Select/Textarea 等

---

## 在程式碼中如何驗證
- 後端：打開 `backend/controllers/eventsController.js` 會看到 controller 僅負責 request/response，核心邏輯交給 service；service 再呼叫 repository。
- 前端：`src/pages/Events.jsx` 與 `src/components/...` 透過 `useEvents()` 取得資料與操作，屬於 observer 模式使用。
