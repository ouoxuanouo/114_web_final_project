# Demo 影片腳本建議（5–8 分鐘）

> 目標：助教看一遍就知道你有「前後端串接 + CRUD + 文件齊全 + UI 佳」

## 0:00–0:40 專案介紹
- 專題名稱：Eventify 活動管理系統
- 技術：React / Express / MongoDB
- 特色：統一 API 回應、錯誤處理、RWD、狀態管理與設計模式

## 0:40–1:40 本機啟動展示
- 終端機：`backend npm run dev`
- 終端機：`frontend npm run dev`
- 打開瀏覽器

## 1:40–3:00 CRUD 展示（前端操作）
1. Read all：首頁活動列表、搜尋/排序
2. Create：新增活動 → toast 成功 → 列表更新
3. Read single：點活動卡進詳情頁
4. Update：按編輯 → 更新地點/日期 → toast
5. Delete：按刪除 → 二次確認 → 列表消失

## 3:00–4:00 錯誤處理展示
- 新增時故意把 title 留空 → 前端提示
- 或用 Postman 打一個錯誤資料 → 後端回 400 + 統一格式

## 4:00–5:30 文件展示
- README：安裝、執行、測試方式
- docs/api-spec.md：API 路由與範例
- docs/design-patterns.md：加分設計模式說明
- Mermaid 圖（架構與流程）

## 5:30–6:30 Git commit 展示
- GitHub repo：至少 5 次 commit
- commit message 清楚（feat/fix/docs/style）

## 6:30–8:00 Q&A（可選）
- 系統可延伸：加入登入、角色權限、報名名單集合等
