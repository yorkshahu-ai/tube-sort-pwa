const STORAGE_KEY = "tube-sort-lab-save-v2";
const CAPACITY = 4;

const CHEMISTRY = {
  heart: { icon: "♡", label: "愛心", className: "chem-heart" },
  star: { icon: "☆", label: "星星", className: "chem-star" },
  bolt: { icon: "ϟ", label: "閃電", className: "chem-bolt" },
  drop: { icon: "", label: "水滴", className: "chem-drop", symbolClass: "symbol-drop" },
  line: { icon: "▭", label: "橫線", className: "chem-line" },
  bars: { icon: "Ⅱ", label: "雙線", className: "chem-bars" },
  pentagon: { icon: "⬟", label: "五邊形", className: "chem-pentagon" },
  downTriangle: { icon: "▽", label: "倒三角形", className: "chem-down-triangle" },
  plus: { icon: "＋", label: "加號", className: "chem-plus" },
  circle: { icon: "○", label: "圓形", className: "chem-circle" },
  diamond: { icon: "◇", label: "菱形", className: "chem-diamond" },
  square: { icon: "□", label: "方形", className: "chem-square" },
  triangle: { icon: "△", label: "三角形", className: "chem-triangle" }
};

const FALLBACK_LEVELS = [
  {
    "id": 1,
    "name": "第 1 關",
    "extraEmptyTubes": 1,
    "tubes": [
      [
        "heart",
        "star",
        "bolt",
        "drop"
      ],
      [
        "star",
        "heart",
        "drop",
        "bolt"
      ],
      [
        "bolt",
        "drop",
        "star",
        "heart"
      ],
      [
        "drop",
        "bolt",
        "heart",
        "star"
      ],
      [],
      []
    ]
  },
  {
    "id": 2,
    "name": "第 2 關",
    "extraEmptyTubes": 1,
    "tubes": [
      [
        "line",
        "plus",
        "circle",
        "diamond"
      ],
      [
        "plus",
        "square",
        "line",
        "triangle"
      ],
      [
        "circle",
        "diamond",
        "square",
        "plus"
      ],
      [
        "diamond",
        "triangle",
        "plus",
        "line"
      ],
      [
        "square",
        "line",
        "triangle",
        "circle"
      ],
      [
        "triangle",
        "circle",
        "diamond",
        "square"
      ],
      [],
      []
    ]
  },
  {
    "id": 3,
    "name": "第 3 關",
    "extraEmptyTubes": 2,
    "tubes": [
      [
        "heart",
        "line",
        "triangle",
        "circle"
      ],
      [
        "star",
        "heart",
        "diamond",
        "plus"
      ],
      [
        "bolt",
        "square",
        "star",
        "line"
      ],
      [
        "drop",
        "triangle",
        "bolt",
        "heart"
      ],
      [
        "line",
        "circle",
        "drop",
        "square"
      ],
      [
        "plus",
        "diamond",
        "circle",
        "bolt"
      ],
      [
        "diamond",
        "drop",
        "plus",
        "triangle"
      ],
      [
        "square",
        "star",
        "heart",
        "drop"
      ],
      [
        "circle",
        "bolt",
        "line",
        "star"
      ],
      [
        "triangle",
        "plus",
        "square",
        "diamond"
      ],
      [],
      []
    ]
  },
  {
    "id": 6,
    "name": "第 6 關",
    "extraEmptyTubes": 1,
    "notes": "依使用者截圖建立。hidden=true 會先顯示問號，當該格成為最上層時自動翻開。",
    "tubes": [
      [
        {
          "type": "bolt",
          "hidden": true
        },
        {
          "type": "drop",
          "hidden": true
        },
        {
          "type": "line",
          "hidden": true
        },
        "bolt"
      ],
      [
        {
          "type": "plus",
          "hidden": true
        },
        {
          "type": "diamond",
          "hidden": true
        },
        {
          "type": "square",
          "hidden": true
        },
        "star"
      ],
      [
        {
          "type": "bolt",
          "hidden": true
        },
        {
          "type": "circle",
          "hidden": true
        },
        {
          "type": "bars",
          "hidden": true
        },
        "heart"
      ],
      [
        {
          "type": "drop",
          "hidden": true
        },
        {
          "type": "plus",
          "hidden": true
        },
        {
          "type": "heart",
          "hidden": true
        },
        "bolt"
      ],
      [
        {
          "type": "circle",
          "hidden": true
        },
        {
          "type": "heart",
          "hidden": true
        },
        {
          "type": "square",
          "hidden": true
        },
        "heart"
      ],
      [
        {
          "type": "star",
          "hidden": true
        },
        {
          "type": "diamond",
          "hidden": true
        },
        {
          "type": "square",
          "hidden": true
        },
        "triangle"
      ],
      [
        {
          "type": "triangle",
          "hidden": true
        },
        {
          "type": "plus",
          "hidden": true
        },
        {
          "type": "star",
          "hidden": true
        },
        "drop"
      ],
      [
        {
          "type": "diamond",
          "hidden": true
        },
        {
          "type": "square",
          "hidden": true
        },
        {
          "type": "diamond",
          "hidden": true
        },
        "bars"
      ],
      [
        {
          "type": "drop",
          "hidden": true
        },
        {
          "type": "line",
          "hidden": true
        },
        {
          "type": "bars",
          "hidden": true
        },
        "line"
      ],
      [
        {
          "type": "star",
          "hidden": true
        },
        {
          "type": "circle",
          "hidden": true
        },
        {
          "type": "line",
          "hidden": true
        },
        "triangle"
      ],
      [
        {
          "type": "plus",
          "hidden": true
        },
        {
          "type": "circle",
          "hidden": true
        },
        {
          "type": "bars",
          "hidden": true
        },
        "triangle"
      ],
      [],
      []
    ]
  },
  {
    "id": 7,
    "name": "第 7 關",
    "extraEmptyTubes": 1,
    "notes": "依使用者提供的第 7 關完整位置圖建立。hidden=true 會先顯示問號，當該格成為最上層時自動翻開。",
    "tubes": [
      [
        {
          "type": "drop",
          "hidden": true
        },
        {
          "type": "bolt",
          "hidden": true
        },
        {
          "type": "square",
          "hidden": true
        },
        "triangle"
      ],
      [
        {
          "type": "diamond",
          "hidden": true
        },
        {
          "type": "star",
          "hidden": true
        },
        {
          "type": "square",
          "hidden": true
        },
        "heart"
      ],
      [
        {
          "type": "plus",
          "hidden": true
        },
        {
          "type": "diamond",
          "hidden": true
        },
        {
          "type": "pentagon",
          "hidden": true
        },
        "line"
      ],
      [
        {
          "type": "star",
          "hidden": true
        },
        {
          "type": "heart",
          "hidden": true
        },
        {
          "type": "bolt",
          "hidden": true
        },
        "line"
      ],
      [
        {
          "type": "circle",
          "hidden": true
        },
        {
          "type": "pentagon",
          "hidden": true
        },
        {
          "type": "plus",
          "hidden": true
        },
        "line"
      ],
      [
        {
          "type": "square",
          "hidden": true
        },
        {
          "type": "bars",
          "hidden": true
        },
        {
          "type": "square",
          "hidden": true
        },
        "triangle"
      ],
      [
        {
          "type": "star",
          "hidden": true
        },
        {
          "type": "bars",
          "hidden": true
        },
        {
          "type": "heart",
          "hidden": true
        },
        "bolt"
      ],
      [
        {
          "type": "star",
          "hidden": true
        },
        {
          "type": "drop",
          "hidden": true
        },
        {
          "type": "circle",
          "hidden": true
        },
        "drop"
      ],
      [
        {
          "type": "drop",
          "hidden": true
        },
        {
          "type": "triangle",
          "hidden": true
        },
        {
          "type": "plus",
          "hidden": true
        },
        "diamond"
      ],
      [
        {
          "type": "circle",
          "hidden": true
        },
        {
          "type": "heart",
          "hidden": true
        },
        {
          "type": "bars",
          "hidden": true
        },
        "bolt"
      ],
      [
        {
          "type": "diamond",
          "hidden": true
        },
        {
          "type": "pentagon",
          "hidden": true
        },
        {
          "type": "triangle",
          "hidden": true
        },
        "circle"
      ],
      [
        {
          "type": "bars",
          "hidden": true
        },
        {
          "type": "plus",
          "hidden": true
        },
        {
          "type": "pentagon",
          "hidden": true
        },
        "line"
      ],
      [],
      []
    ]
  },
  {
    "id": "7A",
    "name": "第 7A 關",
    "extraEmptyTubes": 1,
    "notes": "第 7A 關已依使用者截圖補齊；hidden=true 會先顯示問號，當該格成為最上層時自動翻開。",
    "tubes": [
      [
        "diamond",
        "circle",
        "plus",
        "bolt"
      ],
      [
        "plus",
        "square",
        "pentagon",
        "circle"
      ],
      [
        "heart",
        "square",
        "bolt",
        "triangle"
      ],
      [
        "triangle",
        "pentagon",
        "drop",
        "circle"
      ],
      [
        "bars",
        "heart",
        "bolt",
        "drop"
      ],
      [
        "star",
        "bars",
        "triangle",
        "line"
      ],
      [
        "star",
        "pentagon",
        "drop",
        "square"
      ],
      [
        "diamond",
        "heart",
        "square",
        "line"
      ],
      [
        "bars",
        "bolt",
        "triangle",
        "diamond"
      ],
      [
        "bars",
        "line",
        "pentagon",
        "heart"
      ],
      [
        "plus",
        "circle",
        "plus",
        "star"
      ],
      [
        "star",
        "drop",
        "line",
        "diamond"
      ],
      [],
      []
    ]
  },
  {
    "id": "7B",
    "name": "第 7B 關",
    "extraEmptyTubes": 1,
    "notes": "依使用者提供的第 7B 關截圖建立；第 8 支最底層問號依使用者說明補為紫色直條。",
    "tubes": [
      [
        "line",
        "pentagon",
        "bolt",
        "plus"
      ],
      [
        "bolt",
        "triangle",
        "pentagon",
        "bars"
      ],
      [
        "square",
        "diamond",
        "circle",
        "plus"
      ],
      [
        "star",
        "pentagon",
        "heart",
        "plus"
      ],
      [
        "bolt",
        "star",
        "heart",
        "drop"
      ],
      [
        "circle",
        "heart",
        "circle",
        "square"
      ],
      [
        "bars",
        "star",
        "pentagon",
        "triangle"
      ],
      [
        "bars",
        "line",
        "drop",
        "circle"
      ],
      [
        "line",
        "square",
        "bolt",
        "star"
      ],
      [
        "bars",
        "line",
        "drop",
        "diamond"
      ],
      [
        "diamond",
        "plus",
        "square",
        "triangle"
      ],
      [
        "diamond",
        "heart",
        "drop",
        "triangle"
      ],
      [],
      []
    ]
  },
  {
    "id": "7C",
    "name": "第 7C 關",
    "extraEmptyTubes": 1,
    "notes": "依使用者提供的第 7C 關截圖建立；type=unknown 表示截圖中仍為問號，補齊後才能提供保證可過關提示。",
    "tubes": [
      [
        "bolt",
        "drop",
        "line",
        "bolt"
      ],
      [
        "plus",
        "diamond",
        "square",
        "star"
      ],
      [
        "bolt",
        "circle",
        "bars",
        "heart"
      ],
      [
        "drop",
        "plus",
        "heart",
        "bolt"
      ],
      [
        "circle",
        "heart",
        "square",
        "heart"
      ],
      [
        "star",
        "diamond",
        "square",
        "triangle"
      ],
      [
        "triangle",
        "plus",
        "star",
        "drop"
      ],
      [
        "diamond",
        "square",
        "diamond",
        "bars"
      ],
      [
        "drop",
        "line",
        "bars",
        "line"
      ],
      [
        "star",
        "circle",
        "line",
        "triangle"
      ],
      [
        "plus",
        "circle",
        "bars",
        "triangle"
      ],
      [],
      []
    ]
  },
  {
    "id": "7D",
    "name": "第 7D 關",
    "extraEmptyTubes": 1,
    "notes": "7C 剩餘兩格問號的反向模擬版本：第 4 支底部三角形、第 7 支底部水滴。",
    "tubes": [
      [
        "bolt",
        "drop",
        "line",
        "bolt"
      ],
      [
        "plus",
        "diamond",
        "square",
        "star"
      ],
      [
        "bolt",
        "circle",
        "bars",
        "heart"
      ],
      [
        "triangle",
        "plus",
        "heart",
        "bolt"
      ],
      [
        "circle",
        "heart",
        "square",
        "heart"
      ],
      [
        "star",
        "diamond",
        "square",
        "triangle"
      ],
      [
        "drop",
        "plus",
        "star",
        "drop"
      ],
      [
        "diamond",
        "square",
        "diamond",
        "bars"
      ],
      [
        "drop",
        "line",
        "bars",
        "line"
      ],
      [
        "star",
        "circle",
        "line",
        "triangle"
      ],
      [
        "plus",
        "circle",
        "bars",
        "triangle"
      ],
      [],
      []
    ]
  },
  {
    "id": 8,
    "name": "第 8 關",
    "extraEmptyTubes": 1,
    "notes": "第 8 關已依截圖與圖案數量補齊；hidden=true 會先顯示問號，當該格成為最上層時自動翻開。",
    "tubes": [
      [
        {
          "type": "bolt",
          "hidden": true
        },
        {
          "type": "bolt",
          "hidden": true
        },
        {
          "type": "line",
          "hidden": true
        },
        "square"
      ],
      [
        {
          "type": "star",
          "hidden": true
        },
        {
          "type": "heart",
          "hidden": true
        },
        {
          "type": "plus",
          "hidden": true
        },
        "bars"
      ],
      [
        {
          "type": "line",
          "hidden": true
        },
        {
          "type": "circle",
          "hidden": true
        },
        {
          "type": "drop",
          "hidden": true
        },
        "square"
      ],
      [
        {
          "type": "drop",
          "hidden": true
        },
        {
          "type": "diamond",
          "hidden": true
        },
        {
          "type": "star",
          "hidden": true
        },
        "drop"
      ],
      [
        {
          "type": "line",
          "hidden": true
        },
        {
          "type": "heart",
          "hidden": true
        },
        {
          "type": "plus",
          "hidden": true
        },
        "bolt"
      ],
      [
        {
          "type": "bars",
          "hidden": true
        },
        {
          "type": "pentagon",
          "hidden": true
        },
        {
          "type": "heart",
          "hidden": true
        },
        "line"
      ],
      [
        {
          "type": "plus",
          "hidden": true
        },
        {
          "type": "diamond",
          "hidden": true
        },
        {
          "type": "triangle",
          "hidden": true
        },
        "drop"
      ],
      [
        {
          "type": "plus",
          "hidden": true
        },
        {
          "type": "circle",
          "hidden": true
        },
        {
          "type": "star",
          "hidden": true
        },
        "diamond"
      ],
      [
        {
          "type": "circle",
          "hidden": true
        },
        {
          "type": "pentagon",
          "hidden": true
        },
        {
          "type": "star",
          "hidden": true
        },
        "bars"
      ],
      [
        {
          "type": "square",
          "hidden": true
        },
        {
          "type": "circle",
          "hidden": true
        },
        {
          "type": "triangle",
          "hidden": true
        },
        "pentagon"
      ],
      [
        {
          "type": "bolt",
          "hidden": true
        },
        {
          "type": "triangle",
          "hidden": true
        },
        {
          "type": "diamond",
          "hidden": true
        },
        "pentagon"
      ],
      [
        {
          "type": "square",
          "hidden": true
        },
        {
          "type": "triangle",
          "hidden": true
        },
        {
          "type": "bars",
          "hidden": true
        },
        "heart"
      ],
      [],
      []
    ]
  },
  {
    "id": 9,
    "name": "第 9 關",
    "extraEmptyTubes": 1,
    "notes": "依使用者提供的第 9 關截圖建立；type=unknown 表示截圖中仍為問號。",
    "tubes": [
      [
        "line",
        "bolt",
        "triangle",
        "pentagon"
      ],
      [
        {
          "type": "unknown",
          "hidden": true
        },
        {
          "type": "unknown",
          "hidden": true
        },
        "diamond",
        "square"
      ],
      [
        "plus",
        "triangle",
        "bolt",
        "heart"
      ],
      [
        "line",
        "plus",
        "drop",
        "circle"
      ],
      [
        {
          "type": "unknown",
          "hidden": true
        },
        "pentagon",
        "bars",
        "star"
      ],
      [
        {
          "type": "unknown",
          "hidden": true
        },
        {
          "type": "unknown",
          "hidden": true
        },
        "drop",
        "downTriangle"
      ],
      [
        "diamond",
        "pentagon",
        "drop",
        "heart"
      ],
      [
        "star",
        "diamond",
        "heart",
        "line"
      ],
      [
        "bars",
        "bolt",
        "square",
        "triangle"
      ],
      [
        "line",
        "triangle",
        "bolt",
        "pentagon"
      ],
      [
        {
          "type": "unknown",
          "hidden": true
        },
        "star",
        "bars",
        "square"
      ],
      [
        {
          "type": "unknown",
          "hidden": true
        },
        "plus",
        "star",
        "downTriangle"
      ],
      [
        {
          "type": "unknown",
          "hidden": true
        },
        {
          "type": "unknown",
          "hidden": true
        },
        "circle",
        "heart"
      ],
      [],
      []
    ]
  }
];

const board = document.querySelector("#board");
const levelTitle = document.querySelector("#levelTitle");
const moveCount = document.querySelector("#moveCount");
const emptyBottleCount = document.querySelector("#emptyBottleCount");
const progressCount = document.querySelector("#progressCount");
const message = document.querySelector("#message");
const levelJump = document.querySelector("#levelJump");
const hintButton = document.querySelector("#hintButton");
const undoButton = document.querySelector("#undoButton");
const redoButton = document.querySelector("#redoButton");
const addTubeButton = document.querySelector("#addTubeButton");
const restartButton = document.querySelector("#restartButton");
const replayButton = document.querySelector("#replayButton");
const nextButton = document.querySelector("#nextButton");
const winDialog = document.querySelector("#winDialog");
const winText = document.querySelector("#winText");
const patternToggle = document.querySelector("#patternToggle");

let levels = FALLBACK_LEVELS;
let state = {
  levelIndex: 0,
  tubes: [],
  selectedTube: null,
  history: [],
  redoStack: [],
  moves: 0,
  addedEmptyTubes: 0,
  hint: null,
  lastMove: null,
  patternMode: true
};

async function init() {
  levels = await loadLevels();
  const requestedLevelIndex = getRequestedLevelIndex();
  const saved = loadSave();
  if (requestedLevelIndex !== null) {
    startLevel(requestedLevelIndex, false);
  } else if (saved && levels[saved.levelIndex]) {
    state = {
      ...state,
      ...saved,
      selectedTube: null,
      hint: null
    };
  } else {
    startLevel(0, false);
  }
  registerServiceWorker();
  bindEvents();
  render();
}

function getRequestedLevelIndex() {
  const levelParam = new URLSearchParams(window.location.search).get("level");
  if (!levelParam) return null;
  const requestedId = levelParam.trim().toLowerCase();
  const foundIndex = levels.findIndex((level) => String(level.id).toLowerCase() === requestedId);
  return foundIndex >= 0 ? foundIndex : null;
}

async function loadLevels() {
  try {
    const response = await fetch("./levels.json?v=34", { cache: "reload" });
    if (!response.ok) throw new Error("levels unavailable");
    const data = await response.json();
    return data.levels?.length ? data.levels : FALLBACK_LEVELS;
  } catch {
    return FALLBACK_LEVELS;
  }
}

function bindEvents() {
  hintButton.addEventListener("click", showHint);
  undoButton.addEventListener("click", undo);
  redoButton.addEventListener("click", redo);
  addTubeButton.addEventListener("click", addEmptyTube);
  restartButton.addEventListener("click", () => startLevel(state.levelIndex));
  replayButton.addEventListener("click", () => {
    winDialog.close();
    startLevel(state.levelIndex);
  });
  nextButton.addEventListener("click", () => {
    winDialog.close();
    startLevel((state.levelIndex + 1) % levels.length);
  });
  patternToggle.addEventListener("change", () => {
    state.patternMode = patternToggle.checked;
    saveState();
    render();
  });
}

function startLevel(levelIndex, shouldSave = true) {
  const level = levels[levelIndex];
  state = {
    levelIndex,
    tubes: revealTopCells(cloneTubes(level.tubes)),
    selectedTube: null,
    history: [],
    redoStack: [],
    moves: 0,
    addedEmptyTubes: 0,
    hint: null,
    lastMove: null,
    patternMode: state.patternMode
  };
  if (shouldSave) saveState();
  render();
}

function cloneTubes(tubes) {
  return tubes.map((tube) => tube.map(normalizeCell));
}

function cloneMove(move) {
  return move ? { ...move } : null;
}

function createHistoryEntry() {
  return {
    tubes: cloneTubes(state.tubes),
    moves: state.moves,
    addedEmptyTubes: state.addedEmptyTubes,
    lastMove: cloneMove(state.lastMove)
  };
}

function restoreHistoryEntry(entry) {
  state.tubes = revealTopCells(cloneTubes(entry.tubes));
  state.moves = entry.moves;
  state.addedEmptyTubes = entry.addedEmptyTubes;
  state.lastMove = cloneMove(entry.lastMove);
}

function normalizeCell(cell) {
  if (typeof cell === "string") return { type: cell, hidden: false };
  if (!cell || typeof cell !== "object") return { type: "unknown", hidden: true };
  return {
    type: cell.type || "unknown",
    hidden: Boolean(cell.hidden)
  };
}

function revealTopCells(tubes) {
  return tubes.map((tube) => {
    const nextTube = tube.map(normalizeCell);
    if (nextTube.length) nextTube[nextTube.length - 1].hidden = false;
    return nextTube;
  });
}

function cellType(cell) {
  return normalizeCell(cell).type;
}

function isHidden(cell) {
  return normalizeCell(cell).hidden;
}

function render() {
  const level = levels[state.levelIndex];
  levelTitle.textContent = level.name || `第 ${state.levelIndex + 1} 關`;
  moveCount.textContent = state.moves;
  emptyBottleCount.textContent = Math.max(0, (level.extraEmptyTubes ?? 1) - state.addedEmptyTubes);
  progressCount.textContent = `${getProgress()}%`;
  patternToggle.checked = state.patternMode;
  undoButton.disabled = state.history.length === 0;
  redoButton.disabled = state.redoStack.length === 0;
  addTubeButton.disabled = state.addedEmptyTubes >= (level.extraEmptyTubes ?? 1);

  renderLevelJump();
  board.classList.toggle("dense", state.tubes.length > 10);
  board.innerHTML = "";
  state.tubes.forEach((tube, index) => {
    const button = document.createElement("button");
    button.className = "tube-button";
    button.type = "button";
    button.setAttribute("aria-label", describeTube(tube, index));
    if (state.selectedTube === index) button.classList.add("selected");
    if (state.hint?.from === index) button.classList.add("hint-from");
    if (state.hint?.to === index) button.classList.add("hint-to");
    button.addEventListener("click", () => selectTube(index));

    const tubeElement = document.createElement("div");
    tubeElement.className = "tube";

    for (let slotIndex = 0; slotIndex < CAPACITY; slotIndex += 1) {
      const chemical = tube[slotIndex];
      const slot = document.createElement("div");
      slot.className = "slot";
      if (chemical) {
        const type = cellType(chemical);
        const meta = CHEMISTRY[type];
        if (isHidden(chemical) || type === "unknown" || !meta) {
          slot.classList.add("mystery");
          slot.textContent = "?";
          slot.setAttribute("title", "未知圖案");
        } else {
          slot.classList.add(meta.className);
          if (state.patternMode && meta.symbolClass) {
            const symbol = document.createElement("span");
            symbol.className = `symbol ${meta.symbolClass}`;
            symbol.setAttribute("aria-hidden", "true");
            slot.append(symbol);
          } else {
            slot.textContent = state.patternMode ? meta.icon : "";
          }
          slot.setAttribute("title", meta.label);
        }
      } else {
        slot.classList.add("empty");
        slot.textContent = "";
      }
      tubeElement.append(slot);
    }

    button.append(tubeElement);
    board.append(button);
  });
}

function renderLevelJump() {
  levelJump.innerHTML = "";
  levels.forEach((level, index) => {
    const button = document.createElement("button");
    button.className = "level-jump-button";
    button.type = "button";
    button.textContent = level.id;
    button.setAttribute("aria-label", `切換到第 ${level.id} 關`);
    if (index === state.levelIndex) button.classList.add("active");
    button.addEventListener("click", () => {
      if (index === state.levelIndex) return;
      startLevel(index);
      const url = new URL(window.location.href);
      url.searchParams.set("level", String(level.id));
      window.history.replaceState(null, "", url);
    });
    levelJump.append(button);
  });
}

function describeTube(tube, index) {
  if (!tube.length) return `第 ${index + 1} 支試管，空試管`;
  const names = tube.map((item) => {
    const type = cellType(item);
    if (isHidden(item) || type === "unknown" || !CHEMISTRY[type]) return "未知";
    return CHEMISTRY[type].label;
  }).join("、");
  return `第 ${index + 1} 支試管，從下到上為 ${names}`;
}

function selectTube(index) {
  if (state.selectedTube === null) {
    if (!state.tubes[index].length) {
      setMessage("空試管不能作為起點。");
      return;
    }
    state.selectedTube = index;
    state.hint = null;
    setMessage("再選擇要倒入的試管。");
    render();
    return;
  }

  if (state.selectedTube === index) {
    state.selectedTube = null;
    setMessage("已取消選取。");
    render();
    return;
  }

  const result = moveChemicals(state.selectedTube, index);
  if (!result.ok) {
    setMessage(result.reason);
    if (state.tubes[index].length) state.selectedTube = index;
    render();
    return;
  }

  state.selectedTube = null;
  state.hint = null;
  state.moves += 1;
  setMessage(`已移動 ${result.count} 格 ${CHEMISTRY[result.chemical].label}。`);
  saveState();
  render();

  if (isSolved()) {
    setMessage(`${levels[state.levelIndex].name || "目前關卡"}完成，共移動 ${state.moves} 步。`);
  }
}

function moveChemicals(from, to) {
  const source = state.tubes[from];
  const target = state.tubes[to];
  const validation = canMove(source, target);
  if (!validation.ok) return validation;

  state.history.push(createHistoryEntry());
  state.redoStack = [];

  const count = Math.min(validation.runLength, CAPACITY - target.length);
  const moved = source.splice(source.length - count, count).map((cell) => ({ ...normalizeCell(cell), hidden: false }));
  target.push(...moved);
  state.tubes = revealTopCells(state.tubes);
  state.lastMove = { from, to, chemical: validation.chemical, count };
  return { ok: true, count, chemical: validation.chemical };
}

function canMove(source, target) {
  if (!source.length) return { ok: false, reason: "起點試管是空的。" };
  if (target.length >= CAPACITY) return { ok: false, reason: "目標試管已滿。" };

  const topCell = normalizeCell(source[source.length - 1]);
  if (topCell.hidden || topCell.type === "unknown" || !CHEMISTRY[topCell.type]) {
    return { ok: false, reason: "這格仍是未知圖案，需要補齊關卡資料。" };
  }

  const chemical = topCell.type;
  const targetTopCell = target[target.length - 1] ? normalizeCell(target[target.length - 1]) : null;
  const targetTop = targetTopCell?.type;
  if (targetTopCell?.hidden || targetTop === "unknown") {
    return { ok: false, reason: "目標試管頂端仍是未知圖案。" };
  }
  if (targetTop && targetTop !== chemical) {
    return { ok: false, reason: "只能倒到空試管或相同圖案上方。" };
  }

  let runLength = 1;
  for (let i = source.length - 2; i >= 0; i -= 1) {
    const cell = normalizeCell(source[i]);
    if (cell.hidden || cell.type !== chemical) break;
    runLength += 1;
  }
  return { ok: true, chemical, runLength };
}

function undo() {
  const previous = state.history.pop();
  if (!previous) {
    setMessage("目前沒有可撤回的步驟。");
    return;
  }
  state.redoStack.push(createHistoryEntry());
  restoreHistoryEntry(previous);
  state.selectedTube = null;
  state.hint = null;
  setMessage("已撤回一步。");
  saveState();
  render();
}

function redo() {
  const next = state.redoStack.pop();
  if (!next) {
    setMessage("目前沒有可重做的步驟。");
    return;
  }
  state.history.push(createHistoryEntry());
  restoreHistoryEntry(next);
  state.selectedTube = null;
  state.hint = null;
  setMessage("已重做一步。");
  saveState();
  render();
}

function addEmptyTube() {
  const level = levels[state.levelIndex];
  const limit = level.extraEmptyTubes ?? 1;
  if (state.addedEmptyTubes >= limit) {
    setMessage("這一關的空瓶已用完。");
    return;
  }

  state.history.push(createHistoryEntry());
  state.redoStack = [];
  state.tubes.push([]);
  state.addedEmptyTubes += 1;
  state.selectedTube = null;
  state.hint = null;
  setMessage("已增加一支空試管。");
  saveState();
  render();
}

function showHint() {
  if (hasUnknownCells()) {
    const level = levels[state.levelIndex];
    setMessage(`${level.name || "目前關卡"}仍有未知格，補齊後才能提供保證可過關的提示。`);
    return;
  }

  const hint = findHint();
  if (!hint) {
    setMessage("目前沒有找到可過關路徑，可嘗試撤回或重開。");
    return;
  }
  state.hint = hint;
  const chemical = CHEMISTRY[hint.chemical].label;
  setMessage(`提示：把第 ${hint.from + 1} 支的 ${chemical} 倒到第 ${hint.to + 1} 支。`);
  render();
}

function findHint() {
  return solveNextMove(state.tubes, state.lastMove);
}

function hasUnknownCells() {
  return state.tubes.some((tube) => tube.some((cell) => cellType(cell) === "unknown"));
}

function solveNextMove(tubes, blockedReverseMove = null) {
  const start = tubes.map((tube) => tube.map(cellType));
  const seen = new Set([serializeTubes(start)]);
  const stack = [{ tubes: start, firstMove: null, previousMove: blockedReverseMove }];
  const maxStates = 250000;

  while (stack.length && seen.size < maxStates) {
    const current = stack.pop();
    if (isSolvedTypes(current.tubes)) return current.firstMove;

    const moves = getSolvingMoves(current.tubes, current.previousMove);
    for (const move of moves) {
      const next = applyTypeMove(current.tubes, move);
      const key = serializeTubes(next);
      if (seen.has(key)) continue;
      seen.add(key);
      stack.push({
        tubes: next,
        firstMove: current.firstMove || move,
        previousMove: move
      });
    }
  }

  return null;
}

function serializeTubes(tubes) {
  return tubes.map((tube) => tube.join(",")).join("|");
}

function isSolvedTypes(tubes) {
  return tubes.every((tube) => tube.length === 0 || isCompleteTypeTube(tube));
}

function isCompleteTypeTube(tube) {
  return tube.length === CAPACITY && tube.every((type) => type === tube[0]);
}

function isSingleColorTypeTube(tube) {
  return tube.length > 0 && tube.every((type) => type === tube[0]);
}

function getSolvingMoves(tubes, previousMove = null) {
  const moves = [];
  for (let from = 0; from < tubes.length; from += 1) {
    for (let to = 0; to < tubes.length; to += 1) {
      if (from === to) continue;
      const check = canMoveTypes(tubes[from], tubes[to]);
      if (!check) continue;
      if (isReverseMove({ from, to, chemical: check.chemical }, previousMove)) continue;
      if (isCompleteTypeTube(tubes[from]) && tubes[to].length === 0) continue;
      if (isSingleColorTypeTube(tubes[from]) && tubes[to].length === 0) continue;
      moves.push({
        from,
        to,
        chemical: check.chemical,
        count: check.count,
        targetSize: tubes[to].length,
        runLength: check.runLength
      });
    }
  }

  moves.sort((a, b) => {
    const aCompletes = completesTarget(tubes, a) ? 1 : 0;
    const bCompletes = completesTarget(tubes, b) ? 1 : 0;
    if (aCompletes !== bCompletes) return bCompletes - aCompletes;
    const aMatch = a.targetSize > 0 ? 1 : 0;
    const bMatch = b.targetSize > 0 ? 1 : 0;
    if (aMatch !== bMatch) return bMatch - aMatch;
    return b.runLength - a.runLength;
  });
  return moves;
}

function isReverseMove(move, previousMove) {
  return Boolean(previousMove) &&
    move.from === previousMove.to &&
    move.to === previousMove.from &&
    move.chemical === previousMove.chemical;
}

function canMoveTypes(source, target) {
  if (!source.length || target.length >= CAPACITY) return null;
  const chemical = source[source.length - 1];
  if (chemical === "unknown") return null;
  const targetTop = target[target.length - 1];
  if (targetTop && targetTop !== chemical) return null;

  let runLength = 1;
  for (let i = source.length - 2; i >= 0 && source[i] === chemical; i -= 1) {
    runLength += 1;
  }

  return {
    chemical,
    runLength,
    count: Math.min(runLength, CAPACITY - target.length)
  };
}

function completesTarget(tubes, move) {
  const target = tubes[move.to];
  return target.length + move.count === CAPACITY &&
    (target.length === 0 || target.every((type) => type === move.chemical));
}

function applyTypeMove(tubes, move) {
  const next = tubes.map((tube) => [...tube]);
  const moved = next[move.from].splice(next[move.from].length - move.count, move.count);
  next[move.to].push(...moved);
  return next;
}

function isCompleteTube(tube) {
  if (tube.length !== CAPACITY) return false;
  const first = normalizeCell(tube[0]);
  if (first.hidden || first.type === "unknown") return false;
  return tube.every((item) => {
    const cell = normalizeCell(item);
    return !cell.hidden && cell.type === first.type;
  });
}

function isSolved() {
  return state.tubes.every((tube) => tube.length === 0 || isCompleteTube(tube));
}

function getProgress() {
  const filledTubes = state.tubes.filter((tube) => tube.length > 0);
  if (!filledTubes.length) return 100;
  const completed = filledTubes.filter(isCompleteTube).length;
  return Math.round((completed / filledTubes.length) * 100);
}

function showWinDialog() {
  const level = levels[state.levelIndex];
  winText.textContent = `${level.name || `第 ${state.levelIndex + 1} 關`}完成，共移動 ${state.moves} 步。`;
  nextButton.textContent = state.levelIndex === levels.length - 1 ? "回到第一關" : "下一關";
  if (typeof winDialog.showModal === "function") {
    winDialog.showModal();
  } else {
    alert(winText.textContent);
  }
}

function setMessage(text) {
  message.textContent = text;
}

function saveState() {
  try {
    window.localStorage?.setItem(STORAGE_KEY, JSON.stringify({
      levelIndex: state.levelIndex,
      tubes: state.tubes,
      history: state.history.slice(-80),
      redoStack: state.redoStack.slice(-80),
      moves: state.moves,
      addedEmptyTubes: state.addedEmptyTubes,
      lastMove: cloneMove(state.lastMove),
      patternMode: state.patternMode
    }));
  } catch {
    setMessage("目前瀏覽器未允許儲存進度。");
  }
}

function loadSave() {
  try {
    const saved = JSON.parse(window.localStorage?.getItem(STORAGE_KEY));
    if (!saved || !Array.isArray(saved.tubes)) return null;
    saved.tubes = revealTopCells(cloneTubes(saved.tubes));
    saved.lastMove = cloneMove(saved.lastMove);
    saved.history = Array.isArray(saved.history)
      ? saved.history.map((entry) => ({ ...entry, lastMove: cloneMove(entry.lastMove) }))
      : [];
    saved.redoStack = Array.isArray(saved.redoStack)
      ? saved.redoStack.map((entry) => ({ ...entry, lastMove: cloneMove(entry.lastMove) }))
      : [];
    return saved;
  } catch {
    return null;
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      setMessage("目前瀏覽器未啟用離線快取。");
    });
  });
}

init();
