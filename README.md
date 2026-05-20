# 試管分類實驗室 PWA

手機優先的試管分類小遊戲，使用純 HTML/CSS/JavaScript 製作，可部署到 GitHub Pages，並支援離線遊玩與加入手機主畫面。

## 專案結構

```text
tube-sort-pwa/
├── index.html
├── styles.css
├── app.js
├── levels.json
├── manifest.json
├── sw.js
├── assets/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon.svg
│   └── lab-bg.svg
└── README.md
```

## 功能

- 每支試管最多 4 格。
- 只能移動最上層連續相同圖案。
- 只能倒到空試管或最上層相同圖案的試管。
- 全部試管完成同圖案分類後過關。
- 關卡資料放在 `levels.json`，可擴充多關卡。
- 支援提示、撤回一步、重新開始、增加空瓶、關卡跳轉。
- 勝利彈窗與下一關。
- 目前關卡、局面、步數與撤回紀錄會存到 `localStorage`。
- `manifest.json` 與 `sw.js` 已加入，可離線遊玩並加入手機主畫面。

## 本機預覽

因為 `levels.json` 與 service worker 需要透過 HTTP 載入，請用本機伺服器預覽：

```bash
cd tube-sort-pwa
python3 -m http.server 5173
```

開啟：

```text
http://127.0.0.1:5173
```

## 新增關卡

編輯 `levels.json`：

```json
{
  "id": 4,
  "name": "第 4 關",
  "extraEmptyTubes": 1,
  "tubes": [
    ["heart", "star", "bolt", "drop"],
    [],
    []
  ]
}
```

可用圖案代碼：

```text
heart, star, bolt, drop, line, bars, pentagon, plus, circle, diamond, square, triangle
```

每個非空試管最多 4 個元素，陣列順序是由下到上。

若要做「問號蓋住，倒出上層後才翻開」的關卡，可以把格子寫成物件：

```json
{ "type": "heart", "hidden": true }
```

`type` 是真正圖案，`hidden: true` 代表畫面先顯示 `?`，當它成為試管最上層時會自動翻開。若截圖還沒揭露答案，可暫時用：

```json
{ "type": "unknown", "hidden": true }
```

但 `unknown` 只適合暫存資料，走到該格時會提示需要補齊關卡資料。

## 部署到 GitHub Pages

1. 建立 GitHub repository，例如 `tube-sort-pwa`。
2. 將 `tube-sort-pwa` 資料夾內所有檔案 commit 並 push 到 repository。
3. 到 GitHub repository 的 `Settings`。
4. 進入 `Pages`。
5. `Build and deployment` 選擇 `Deploy from a branch`。
6. Branch 選 `main`，資料夾選 `/root`。
7. 儲存後等待 GitHub Pages 完成部署。
8. 開啟 GitHub Pages 網址，例如：

```text
https://你的帳號.github.io/tube-sort-pwa/
```

若你把本專案放在 repository 的子資料夾，Pages 的發布來源要選到正確分支與資料夾，或改用 GitHub Actions 把 `tube-sort-pwa` 發布出去。

## 手機加入主畫面

- iPhone Safari：開啟部署網址，點分享，選「加入主畫面」。
- Android Chrome：開啟部署網址，點選安裝提示或選單中的「加到主畫面」。
