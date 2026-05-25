// Katana price data aggregated from community trade chat.
// Each skin: { sell|buy: { WW|SI|MC: { normal:[], FT:[] } } }
const DATA = [
  {
    name: "Crimson",
    prices: {
      sell: {
        WW: { normal: [30, 40, 40],          FT: [35, 35] },
        SI: { normal: [45, 45, 55, 55, 65, 53, 55, 60], FT: [55, 55, 100, 100] },
        MC: { normal: [100, 100, 115, 100, 100, 100], FT: [130, 130] }
      },
      buy: {
        SI: { normal: [65] },
        MC: { normal: [110, 110] }
      }
    }
  },
  {
    name: "Dynasty",
    prices: {
      sell: {
        WW: { normal: [30, 40, 40, 40, 40], FT: [] },
        SI: { normal: [45, 50],             FT: [] },
        MC: { normal: [70, 80, 70, 90],     FT: [90] }
      },
      buy: {}
    }
  },
  {
    name: "Muramasa",
    prices: {
      sell: {
        WW: { normal: [30, 30, 40, 35], FT: [50] },
        SI: { normal: [45, 45, 65, 70], FT: [] },
        MC: { normal: [87, 90, 130],    FT: [] }
      },
      buy: {}
    }
  },
  {
    name: "Orochi",
    prices: {
      sell: {
        SI: { normal: [45, 55, 45, 40, 45, 40, 55, 45, 45, 55, 45, 55], FT: [70] },
        MC: { normal: [75, 85, 75],                                    FT: [100] }
      },
      buy: {
        SI: { normal: [45] }
      }
    }
  },
  {
    name: "Adurite",
    prices: {
      sell: {
        WW: { normal: [40, 40, 40],                  FT: [] },
        MC: { normal: [140, 140, 110, 125, 75, 140], FT: [] }
      },
      buy: {}
    }
  },
  {
    name: "Vanilla",
    prices: {
      sell: {
        MC: { normal: [35, 45, 45], FT: [50, 65] },
        SI: { normal: [45, 45, 50, 45], FT: [] }
      },
      buy: {}
    }
  },
  {
    name: "Wanwood",
    prices: {
      sell: {
        WW: { normal: [35],         FT: [] },
        SI: { normal: [55, 45, 45], FT: [] },
        MC: { normal: [65],         FT: [130, 130] }
      },
      buy: {}
    }
  },
  {
    name: "Cherry",
    prices: {
      sell: {
        WW: { normal: [],   FT: [45, 40, 45, 45] },
        SI: { normal: [45], FT: [] }
      },
      buy: {}
    }
  },
  {
    name: "Blacksteel",
    prices: {
      sell: {
        WW: { normal: [40, 40],    FT: [] },
        SI: { normal: [50, 60, 50],FT: [] },
        MC: { normal: [85],        FT: [] }
      },
      buy: {}
    }
  },
  {
    name: "OG Bluesteel",
    prices: {
      sell: {
        SI: { normal: [], FT: [60] },
        MC: { normal: [75, 85, 75], FT: [100] }
      },
      buy: {}
    }
  },
  {
    name: "Cookie",
    prices: {
      sell: {
        MC: { normal: [], FT: [75] }
      },
      buy: {}
    }
  },
  {
    name: "Black Iron",
    prices: {
      sell: {
        WW: { normal: [40], FT: [] }
      },
      buy: {
        SI: { normal: [45] }
      }
    }
  },
  {
    name: "Bombastic",
    prices: {
      sell: {
        WW: { normal: [35],     FT: [] },
        MC: { normal: [65, 70], FT: [100] }
      },
      buy: {
        SI: { normal: [35] }
      }
    }
  },
  {
    name: "Shogun",
    prices: {
      sell: {
        MC: { normal: [50], FT: [60, 65] }
      },
      buy: {}
    }
  },
  {
    name: "Malachite",
    prices: {
      sell: {
        SI: { normal: [90],  FT: [] },
        MC: { normal: [150], FT: [] }
      },
      buy: {
        SI: { normal: [65] }
      }
    }
  },
  {
    name: "Peppermint",
    prices: {
      sell: {
        SI: { normal: [50], FT: [] }
      },
      buy: {}
    }
  },
  {
    name: "Katana of Destiny",
    prices: {
      sell: {
        MC: { normal: [130], FT: [] }
      },
      buy: {
        SI: { normal: [45] },
        MC: { normal: [130] }
      }
    }
  },
  {
    name: "Frostborn",
    prices: {
      sell: {
        MC: { normal: [120, 120], FT: [] }
      },
      buy: {}
    }
  },
  {
    name: "True White",
    prices: {
      sell: {
        MC: { normal: [200], FT: [] }
      },
      buy: {}
    }
  }
];

// --- state ---
const state = {
  mode: "sell",      // sell | buy
  search: "",
  perCard: {}        // { [skinName]: { quality, stattrack } }
};

const QUALITIES = ["WW", "SI", "MC"];
const STATTRACKS = ["Normal", "FT"];

// --- helpers ---
function avg(arr) {
  if (!arr || !arr.length) return null;
  return arr.reduce((s, v) => s + v, 0) / arr.length;
}
function minMax(arr) {
  if (!arr || !arr.length) return [null, null];
  return [Math.min(...arr), Math.max(...arr)];
}
function fmt(n) {
  if (n == null) return "—";
  const r = Math.round(n * 10) / 10;
  return Number.isInteger(r) ? `$${r}` : `$${r.toFixed(1)}`;
}

function getPrices(skin, mode, quality, stattrack) {
  const block = skin.prices?.[mode];
  if (!block) return [];
  const qBlock = block[quality];
  if (!qBlock) return [];
  const key = stattrack === "FT" ? "FT" : "normal";
  return qBlock[key] || [];
}

function pickInitialQuality(skin, mode) {
  const block = skin.prices?.[mode] || {};
  for (const q of ["MC", "SI", "WW"]) {
    const b = block[q];
    if (b && ((b.normal && b.normal.length) || (b.FT && b.FT.length))) return q;
  }
  return "MC";
}

function pickInitialStattrack(skin, mode, quality) {
  const b = skin.prices?.[mode]?.[quality];
  if (!b) return "Normal";
  if (b.normal && b.normal.length) return "Normal";
  if (b.FT && b.FT.length) return "FT";
  return "Normal";
}

// fuzzy: tokens of query must all be substrings of (skin name + "katana") or "katana"
function matchesSearch(skin, query) {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  if (!q) return true;
  const haystack = (skin.name + " katana").toLowerCase();
  const tokens = q.split(/\s+/).filter(Boolean);
  return tokens.every(t => haystack.includes(t));
}

// --- rendering ---
const grid = document.getElementById("grid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const modeToggle = document.getElementById("modeToggle");

function render() {
  const q = state.search;
  const visible = DATA.filter(s => matchesSearch(s, q));

  grid.innerHTML = "";
  if (!visible.length) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  for (const skin of visible) {
    grid.appendChild(renderCard(skin));
  }
}

function renderCard(skin) {
  const card = document.createElement("article");
  card.className = "card";

  const sel = state.perCard[skin.name] || {};
  let quality = sel.quality;
  let stattrack = sel.stattrack;

  // re-pick defaults if current selection has no data for current mode
  const hasData = (q, st) => getPrices(skin, state.mode, q, st).length > 0;
  if (!quality || !QUALITIES.includes(quality)) quality = pickInitialQuality(skin, state.mode);
  if (!stattrack) stattrack = pickInitialStattrack(skin, state.mode, quality);

  state.perCard[skin.name] = { quality, stattrack };

  const head = document.createElement("div");
  head.className = "card-head";

  const nameEl = document.createElement("h2");
  nameEl.className = "card-name";
  nameEl.textContent = `${skin.name} Katana`;
  head.appendChild(nameEl);

  const dropdowns = document.createElement("div");
  dropdowns.className = "card-dropdowns";

  const qDropdown = makeDropdown({
    value: quality,
    options: QUALITIES.map(q => ({
      value: q,
      label: q,
      disabled: !(hasData(q, "Normal") || hasData(q, "FT"))
    })),
    onChange: (val) => {
      state.perCard[skin.name].quality = val;
      // re-evaluate stattrack
      if (!hasData(val, state.perCard[skin.name].stattrack)) {
        state.perCard[skin.name].stattrack = pickInitialStattrack(skin, state.mode, val);
      }
      render();
    }
  });

  const stDropdown = makeDropdown({
    value: stattrack,
    options: STATTRACKS.map(st => ({
      value: st,
      label: st,
      disabled: !hasData(quality, st)
    })),
    onChange: (val) => {
      state.perCard[skin.name].stattrack = val;
      render();
    }
  });

  dropdowns.appendChild(qDropdown);
  dropdowns.appendChild(stDropdown);
  head.appendChild(dropdowns);

  // price
  const prices = getPrices(skin, state.mode, quality, stattrack);
  const average = avg(prices);
  const [mn, mx] = minMax(prices);

  const priceRow = document.createElement("div");
  priceRow.className = "price-row";
  priceRow.style.flexDirection = "column";
  priceRow.style.alignItems = "flex-start";

  const labelEl = document.createElement("span");
  labelEl.className = "price-label";
  labelEl.textContent = state.mode === "sell" ? "Avg sell price" : "Avg buy price";
  priceRow.appendChild(labelEl);

  const targetEl = document.createElement("div");
  targetEl.className = "price-target";

  if (average == null) {
    const noData = document.createElement("span");
    noData.className = "nodata";
    noData.textContent = "No data";
    targetEl.appendChild(noData);
    targetEl.style.cursor = "default";
  } else {
    targetEl.textContent = fmt(average);
    const tip = document.createElement("div");
    tip.className = "tooltip";
    tip.innerHTML = `
      <div class="row"><span>Min</span><span>${fmt(mn)}</span></div>
      <div class="row"><span>Max</span><span>${fmt(mx)}</span></div>
      <div class="row"><span>Samples</span><span>${prices.length}</span></div>
    `;
    targetEl.appendChild(tip);
  }
  priceRow.appendChild(targetEl);

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.innerHTML = `
    <span>${quality}</span>
    <span>${stattrack === "FT" ? "StatTrack (FT)" : "Standard"}</span>
    <span>${state.mode === "sell" ? "Selling" : "Buying"}</span>
  `;

  card.appendChild(head);
  card.appendChild(priceRow);
  card.appendChild(meta);

  return card;
}

function makeDropdown({ value, options, onChange }) {
  const wrap = document.createElement("div");
  wrap.className = "dropdown";

  const btn = document.createElement("button");
  btn.className = "dropdown-btn";
  btn.type = "button";
  btn.textContent = value;
  wrap.appendChild(btn);

  const menu = document.createElement("div");
  menu.className = "dropdown-menu";

  options.forEach(opt => {
    const item = document.createElement("div");
    item.className = "dropdown-item" + (opt.value === value ? " selected" : "") + (opt.disabled ? " disabled" : "");
    item.textContent = opt.label;
    if (!opt.disabled) {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        closeAllDropdowns();
        onChange(opt.value);
      });
    }
    menu.appendChild(item);
  });
  wrap.appendChild(menu);

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasOpen = menu.classList.contains("open");
    closeAllDropdowns();
    if (!wasOpen) {
      menu.classList.add("open");
      btn.classList.add("open");
    }
  });

  return wrap;
}

function closeAllDropdowns() {
  document.querySelectorAll(".dropdown-menu.open").forEach(m => m.classList.remove("open"));
  document.querySelectorAll(".dropdown-btn.open").forEach(b => b.classList.remove("open"));
}

document.addEventListener("click", closeAllDropdowns);

// --- events ---
modeToggle.addEventListener("click", (e) => {
  const btn = e.target.closest(".toggle-btn");
  if (!btn) return;
  const mode = btn.dataset.mode;
  if (!mode || mode === state.mode) return;
  state.mode = mode;
  modeToggle.querySelectorAll(".toggle-btn").forEach(b => {
    const active = b.dataset.mode === mode;
    b.classList.toggle("active", active);
    b.setAttribute("aria-selected", active ? "true" : "false");
  });
  // reset per-card defaults so quality/stattrack auto-pick valid ones for new mode
  state.perCard = {};
  render();
});

searchInput.addEventListener("input", (e) => {
  state.search = e.target.value;
  render();
});

render();
