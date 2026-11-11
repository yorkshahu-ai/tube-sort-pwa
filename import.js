const CUSTOM_LEVELS_KEY = "tube-sort-custom-levels-v1";
const VERSION = 53;

const SYMBOLS = [
  ["heart", "愛心", "♡"],
  ["star", "星星", "☆"],
  ["bolt", "閃電", "ϟ"],
  ["drop", "水滴", "滴"],
  ["line", "橫線", "▭"],
  ["bars", "雙線", "Ⅱ"],
  ["pentagon", "五邊形", "⬟"],
  ["downTriangle", "倒三角形", "▽"],
  ["cross", "叉號", "×"],
  ["plus", "加號", "＋"],
  ["circle", "圓形", "○"],
  ["diamond", "菱形", "◇"],
  ["square", "方形", "□"],
  ["triangle", "三角形", "△"]
];

const TOOLS = [
  ["unknown", "? 未知", "?"],
  ["", "空格", "空"],
  ...SYMBOLS
];

const imageInput = document.querySelector("#imageInput");
const imagePreview = document.querySelector("#imagePreview");
const levelName = document.querySelector("#levelName");
const tubeCount = document.querySelector("#tubeCount");
const hideLowerCells = document.querySelector("#hideLowerCells");
const symbolPalette = document.querySelector("#symbolPalette");
const activeToolLabel = document.querySelector("#activeToolLabel");
const tubeEditorGrid = document.querySelector("#tubeEditorGrid");
const generateButton = document.querySelector("#generateButton");
const copyButton = document.querySelector("#copyButton");
const resultBox = document.querySelector("#resultBox");
const validationMessage = document.querySelector("#validationMessage");
const playLink = document.querySelector("#playLink");

let latestUrl = "";
let activeTool = "unknown";

function init() {
  imageInput.addEventListener("change", previewImage);
  tubeCount.addEventListener("change", renderTubeEditors);
  generateButton.addEventListener("click", generatePlayableLevel);
  copyButton.addEventListener("click", copyPlayableUrl);
  renderSymbolPalette();
  renderTubeEditors();
}

function renderSymbolPalette() {
  symbolPalette.innerHTML = "";
  TOOLS.forEach(([value, label, icon]) => {
    const button = document.createElement("button");
    button.className = "palette-button";
    button.type = "button";
    button.dataset.value = value;
    button.setAttribute("aria-label", `選擇${label}`);
    if (value === activeTool) button.classList.add("active");
    button.textContent = icon;
    button.title = label;
    button.addEventListener("click", () => selectTool(value));
    symbolPalette.append(button);
  });
}

function selectTool(value) {
  activeTool = value;
  const tool = TOOLS.find(([toolValue]) => toolValue === value);
  activeToolLabel.textContent = `目前選取：${tool?.[1] || "空格"}`;
  renderSymbolPalette();
}

function previewImage() {
  const file = imageInput.files?.[0];
  if (!file) {
    imagePreview.classList.remove("visible");
    imagePreview.removeAttribute("src");
    return;
  }
  imagePreview.src = URL.createObjectURL(file);
  imagePreview.classList.add("visible");
}

function renderTubeEditors() {
  const count = Number(tubeCount.value);
  tubeEditorGrid.innerHTML = "";
  for (let tubeIndex = 0; tubeIndex < count; tubeIndex += 1) {
    const editor = document.createElement("section");
    editor.className = "tube-editor";

    const title = document.createElement("div");
    title.className = "tube-editor-title";
    title.textContent = `第 ${tubeIndex + 1} 支`;
    editor.append(title);

    const selects = document.createElement("div");
    selects.className = "cell-selects";
    ["最上層", "第 2 格", "第 3 格", "最底層"].forEach((label, cellIndex) => {
      const select = document.createElement("select");
      select.dataset.tube = String(tubeIndex);
      select.dataset.cell = String(cellIndex);
      select.setAttribute("aria-label", `第 ${tubeIndex + 1} 支 ${label}`);
      select.append(new Option(`${label}：空`, ""));
      select.append(new Option(`${label}：? 未知`, "unknown"));
      SYMBOLS.forEach(([value, text]) => select.append(new Option(`${label}：${text}`, value)));
      select.addEventListener("change", () => updateQuickCell(tubeIndex, cellIndex, select.value));
      selects.append(select);
    });
    editor.append(selects);

    const quickTube = document.createElement("div");
    quickTube.className = "quick-tube";
    ["最上層", "第 2 格", "第 3 格", "最底層"].forEach((label, cellIndex) => {
      const button = document.createElement("button");
      button.className = "quick-cell";
      button.type = "button";
      button.dataset.tube = String(tubeIndex);
      button.dataset.cell = String(cellIndex);
      button.setAttribute("aria-label", `設定第 ${tubeIndex + 1} 支 ${label}`);
      button.addEventListener("click", () => setCellValue(tubeIndex, cellIndex, activeTool));
      quickTube.append(button);
    });
    editor.append(quickTube);
    tubeEditorGrid.append(editor);
    for (let cellIndex = 0; cellIndex < 4; cellIndex += 1) {
      updateQuickCell(tubeIndex, cellIndex, "");
    }
  }
}

function setCellValue(tubeIndex, cellIndex, value) {
  const select = tubeEditorGrid.querySelector(`select[data-tube="${tubeIndex}"][data-cell="${cellIndex}"]`);
  if (!select) return;
  select.value = value;
  updateQuickCell(tubeIndex, cellIndex, value);
}

function updateQuickCell(tubeIndex, cellIndex, value) {
  const button = tubeEditorGrid.querySelector(`.quick-cell[data-tube="${tubeIndex}"][data-cell="${cellIndex}"]`);
  if (!button) return;
  const tool = TOOLS.find(([toolValue]) => toolValue === value);
  button.textContent = tool?.[2] || "";
  button.title = tool?.[1] || "空格";
  button.dataset.value = value;
  button.classList.toggle("is-empty", value === "");
  button.classList.toggle("is-unknown", value === "unknown");
}

function generatePlayableLevel() {
  const level = buildLevel();
  const warnings = validateLevel(level);
  const encoded = encodeLevel(level);
  const url = new URL("./index.html", window.location.href);
  url.searchParams.set("custom", encoded);
  url.searchParams.set("fresh", String(VERSION));
  latestUrl = url.href;

  saveRecentLevel(level);
  playLink.href = latestUrl;
  playLink.textContent = latestUrl;
  validationMessage.textContent = warnings.length
    ? warnings.join(" ")
    : "已產生可試玩的自訂關卡。若沒有未知格，提示功能會嘗試尋找可過關路徑。";
  resultBox.classList.add("visible");
  copyButton.disabled = false;
}

function buildLevel() {
  const count = Number(tubeCount.value);
  const tubes = [];
  for (let tubeIndex = 0; tubeIndex < count; tubeIndex += 1) {
    const topToBottom = [...tubeEditorGrid.querySelectorAll(`select[data-tube="${tubeIndex}"]`)]
      .map((select) => select.value)
      .filter(Boolean);
    const bottomToTop = topToBottom.reverse();
    tubes.push(bottomToTop.map((type, index) => {
      if (type === "unknown") return { type: "unknown", hidden: true };
      const shouldHide = hideLowerCells.checked && index < bottomToTop.length - 1;
      return shouldHide ? { type, hidden: true } : type;
    }));
  }

  return {
    id: "自訂",
    name: levelName.value.trim() || "自訂關卡",
    extraEmptyTubes: 1,
    notes: "由匯入頁產生的線上試玩關卡。",
    tubes
  };
}

function validateLevel(level) {
  const warnings = [];
  const counts = new Map();
  let unknowns = 0;
  let filled = 0;

  level.tubes.forEach((tube) => {
    if (tube.length > 4) warnings.push("有試管超過 4 格。");
    tube.forEach((cell) => {
      const type = typeof cell === "string" ? cell : cell?.type;
      if (!type) return;
      filled += 1;
      if (type === "unknown") {
        unknowns += 1;
        return;
      }
      counts.set(type, (counts.get(type) || 0) + 1);
    });
  });

  if (!filled) warnings.push("目前還沒有填入任何圖案。");
  if (unknowns) warnings.push(`仍有 ${unknowns} 格未知，能試玩但提示不一定可用。`);
  const uneven = [...counts.entries()].filter(([, count]) => count !== 4);
  if (!unknowns && uneven.length) warnings.push("部分圖案數量不是 4 個，可能不是完整可解關卡。");
  return warnings;
}

function encodeLevel(level) {
  const json = JSON.stringify(level);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function saveRecentLevel(level) {
  try {
    const saved = JSON.parse(localStorage.getItem(CUSTOM_LEVELS_KEY) || "[]");
    saved.unshift({ level, savedAt: new Date().toISOString() });
    localStorage.setItem(CUSTOM_LEVELS_KEY, JSON.stringify(saved.slice(0, 10)));
  } catch {
    // The playable URL still works even when localStorage is unavailable.
  }
}

async function copyPlayableUrl() {
  if (!latestUrl) return;
  try {
    await navigator.clipboard.writeText(latestUrl);
    validationMessage.textContent = "已複製試玩連結。";
  } catch {
    validationMessage.textContent = "瀏覽器不允許自動複製，請手動選取下方連結。";
  }
}

init();
