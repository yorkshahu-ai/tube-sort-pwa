const STORAGE_KEY = "tube-sort-lab-save-v1";
const CAPACITY = 4;

const CHEMISTRY = {
  heart: { icon: "♡", label: "愛心", className: "chem-heart" },
  star: { icon: "☆", label: "星星", className: "chem-star" },
  bolt: { icon: "ϟ", label: "閃電", className: "chem-bolt" },
  drop: { icon: "", label: "水滴", className: "chem-drop", symbolClass: "symbol-drop" },
  line: { icon: "▭", label: "橫線", className: "chem-line" },
  bars: { icon: "Ⅱ", label: "雙線", className: "chem-bars" },
  plus: { icon: "＋", label: "加號", className: "chem-plus" },
  circle: { icon: "○", label: "圓形", className: "chem-circle" },
  diamond: { icon: "◇", label: "菱形", className: "chem-diamond" },
  square: { icon: "□", label: "方形", className: "chem-square" },
  triangle: { icon: "△", label: "三角形", className: "chem-triangle" }
};

const FALLBACK_LEVELS = [
  {
    id: 1,
    name: "第 1 關",
    extraEmptyTubes: 1,
    tubes: [
      ["heart", "star", "bolt", "drop"],
      ["star", "heart", "drop", "bolt"],
      ["bolt", "drop", "star", "heart"],
      ["drop", "bolt", "heart", "star"],
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
const hintButton = document.querySelector("#hintButton");
const undoButton = document.querySelector("#undoButton");
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
  moves: 0,
  addedEmptyTubes: 0,
  hint: null,
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
  const requestedId = Number(levelParam);
  const foundIndex = levels.findIndex((level) => level.id === requestedId);
  return foundIndex >= 0 ? foundIndex : null;
}

async function loadLevels() {
  try {
    const response = await fetch("./levels.json", { cache: "no-cache" });
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
    moves: 0,
    addedEmptyTubes: 0,
    hint: null,
    patternMode: state.patternMode
  };
  if (shouldSave) saveState();
  render();
}

function cloneTubes(tubes) {
  return tubes.map((tube) => tube.map(normalizeCell));
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
  addTubeButton.disabled = state.addedEmptyTubes >= (level.extraEmptyTubes ?? 1);

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
    setTimeout(showWinDialog, 220);
  }
}

function moveChemicals(from, to) {
  const source = state.tubes[from];
  const target = state.tubes[to];
  const validation = canMove(source, target);
  if (!validation.ok) return validation;

  state.history.push({
    tubes: cloneTubes(state.tubes),
    moves: state.moves,
    addedEmptyTubes: state.addedEmptyTubes
  });

  const count = Math.min(validation.runLength, CAPACITY - target.length);
  const moved = source.splice(source.length - count, count).map((cell) => ({ ...normalizeCell(cell), hidden: false }));
  target.push(...moved);
  state.tubes = revealTopCells(state.tubes);
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
  state.tubes = revealTopCells(cloneTubes(previous.tubes));
  state.moves = previous.moves;
  state.addedEmptyTubes = previous.addedEmptyTubes;
  state.selectedTube = null;
  state.hint = null;
  setMessage("已撤回一步。");
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

  state.history.push({
    tubes: cloneTubes(state.tubes),
    moves: state.moves,
    addedEmptyTubes: state.addedEmptyTubes
  });
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
    setMessage("第 6 關仍有未知格，補齊後才能提供保證可過關的提示。");
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
  return solveNextMove(state.tubes);
}

function hasUnknownCells() {
  return state.tubes.some((tube) => tube.some((cell) => cellType(cell) === "unknown"));
}

function solveNextMove(tubes) {
  const start = tubes.map((tube) => tube.map(cellType));
  const seen = new Set([serializeTubes(start)]);
  const stack = [{ tubes: start, firstMove: null }];
  const maxStates = 250000;

  while (stack.length && seen.size < maxStates) {
    const current = stack.pop();
    if (isSolvedTypes(current.tubes)) return current.firstMove;

    const moves = getSolvingMoves(current.tubes);
    for (const move of moves) {
      const next = applyTypeMove(current.tubes, move);
      const key = serializeTubes(next);
      if (seen.has(key)) continue;
      seen.add(key);
      stack.push({
        tubes: next,
        firstMove: current.firstMove || move
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

function getSolvingMoves(tubes) {
  const moves = [];
  for (let from = 0; from < tubes.length; from += 1) {
    for (let to = 0; to < tubes.length; to += 1) {
      if (from === to) continue;
      const check = canMoveTypes(tubes[from], tubes[to]);
      if (!check) continue;
      if (isCompleteTypeTube(tubes[from]) && tubes[to].length === 0) continue;
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
      moves: state.moves,
      addedEmptyTubes: state.addedEmptyTubes,
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
