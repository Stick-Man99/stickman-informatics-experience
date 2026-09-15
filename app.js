const CODE_DEFAULTS = {
  newton: {
    core: [
      'double n = 4.0;                 // 目标面积',
      'double x = 1.0;                 // 初始猜想',
      'double eps = 0.000001;           // 停止精度',
      '',
      'for (int i = 0; i < 10; i++) {',
      '    double y = n / x;           // 算出另一条边',
      '    x = (x + y) / 2.0;          // 两条边取平均',
      '    cout << x << endl;          // 输出新猜想',
      '    if (fabs(x - y) < eps) break;',
      '}',
    ],
    full: [
      '#include <cmath>',
      '#include <iostream>',
      'using namespace std;',
      '',
      'int main() {',
      '    double n = 4.0;             // 目标面积',
      '    double x = 1.0;             // 初始猜想',
      '    double eps = 0.000001;       // 停止精度',
      '',
      '    for (int i = 0; i < 10; i++) {',
      '        double y = n / x;',
      '        x = (x + y) / 2.0;',
      '        cout << x << endl;',
      '        if (fabs(x - y) < eps) break;',
      '    }',
      '',
      '    return 0;',
      '}',
    ],
  },
  dfs: {
    dfs: {
    core: [
      'void dfs(int x, int y) {',
      '    if (已经送完所有订单) return;',
      '',
      '    visited[x][y] = true;       // 标记当前位置',
      '    if (这里有客户) deliver();',
      '',
      '    for (四个方向) {',
      '        if (可以走 && !visited[nx][ny]) {',
      '            dfs(nx, ny);         // 递归深入',
      '        }',
      '    }',
      '',
      '    return;                     // 走不通就回退',
      '}',
    ],
    full: [
      '#include <iostream>',
      '#include <string>',
      '#include <vector>',
      'using namespace std;',
      '',
      'vector<string> maze;',
      'vector<vector<bool>> visited;',
      'bool delivered[10] = {};',
      'int deliveredCount = 0, total = 0;',
      'int startX = 0, startY = 0;',
      'int dx[4] = {-1, 0, 1, 0};',
      'int dy[4] = {0, 1, 0, -1};',
      '',
      'bool isCustomer(char cell) {',
      '    return cell >= \'1\' && cell <= \'9\';',
      '}',
      '',
      'bool canMove(int x, int y) {',
      '    return x >= 0 && x < (int)maze.size()',
      '        && y >= 0 && y < (int)maze[0].size()',
      '        && maze[x][y] != \'#\' && !visited[x][y];',
      '}',
      '',
      'void dfs(int x, int y) {',
      '    visited[x][y] = true;       // 标记当前位置',
      '    char cell = maze[x][y];',
      '    if (isCustomer(cell) && !delivered[cell - \'0\']) {',
      '        delivered[cell - \'0\'] = true;',
      '        ++deliveredCount;',
      '    }',
      '    if (deliveredCount == total) return;',
      '',
      '    for (int i = 0; i < 4; i++) {',
      '        int nx = x + dx[i], ny = y + dy[i];',
      '        if (canMove(nx, ny)) {',
      '            dfs(nx, ny);         // 递归深入',
      '            if (deliveredCount == total) return;',
      '        }',
      '    }',
      '    // 没有新路，函数结束后回到上一层',
      '}',
      '',
      'int main() {',
      '    int height, width;',
      '    cin >> height >> width;',
      '    maze.resize(height);',
      '    for (int i = 0; i < height; i++) {',
      '        cin >> maze[i];',
      '        for (int j = 0; j < width; j++) {',
      '            if (isCustomer(maze[i][j])) ++total;',
      '            if (maze[i][j] == \'S\') startX = i, startY = j;',
      '        }',
      '    }',
      '    visited.assign(height, vector<bool>(width, false));',
      '    dfs(startX, startY);',
      '    if (deliveredCount == total) cout << "全部送达" << endl;',
      '    else cout << deliveredCount << "/" << total << " 个订单已送达" << endl;',
      '    return 0;',
      '}',
    ],
      },
    bfs: {
      core: [
        'queue<State> q;                 // 先进先出',
        'q.push({起点, 0});              // 还没有送达客户',
        '',
        'while (!q.empty()) {',
        '    State cur = q.front(); q.pop();',
        '    for (四个方向) {',
        '        if (可以走 && 状态没有访问过) {',
        '            next.mask = cur.mask;',
        '            if (这里有客户) 更新 mask;',
        '            q.push(next);',
        '        }',
        '    }',
        '}',
        '第一次找到全部客户，就是最短路线。',
      ],
      full: [
        '#include <iostream>',
        '#include <queue>',
        '#include <string>',
        '#include <vector>',
        'using namespace std;',
        '',
        'struct State { int x, y, mask; };',
        'int dx[4] = {-1, 0, 1, 0};',
        'int dy[4] = {0, 1, 0, -1};',
        '',
        'bool canMove(const vector<string>& maze, int x, int y) {',
        '    return x >= 0 && x < (int)maze.size()',
        '        && y >= 0 && y < (int)maze[0].size()',
        '        && maze[x][y] != \'#\';',
        '}',
        '',
        'int main() {',
        '    int height, width, sx, sy, targetCount;',
        '    cin >> height >> width;',
        '    vector<string> maze(height);',
        '    for (int i = 0; i < height; i++) {',
        '        cin >> maze[i];',
        '        for (int j = 0; j < width; j++)',
        '            if (maze[i][j] == \'S\') sx = i, sy = j;',
        '    }',
        '    cin >> targetCount;',
        '    int fullMask = (1 << targetCount) - 1;',
        '    queue<State> q;',
        '    q.push({sx, sy, 0});',
        '    vector<vector<vector<int>>> dist(',
        '        height, vector<vector<int>>(',
        '            width, vector<int>(1 << targetCount, -1)));',
        '    dist[sx][sy][0] = 0;',
        '    bool found = false;',
        '    while (!q.empty()) {',
        '        State cur = q.front(); q.pop();',
        '        if (cur.mask == fullMask) {',
        '            cout << "最短路线长度: " << dist[cur.x][cur.y][cur.mask] << endl;',
        '            found = true;',
        '            break;',
        '        }',
        '        for (int i = 0; i < 4; i++) {',
        '            int nx = cur.x + dx[i], ny = cur.y + dy[i];',
        '            if (!canMove(maze, nx, ny)) continue;',
        '            int nextMask = cur.mask;',
        '            if (maze[nx][ny] >= \'1\' && maze[nx][ny] <= \'9\')',
        '                nextMask |= 1 << (maze[nx][ny] - \'1\');',
        '            if (dist[nx][ny][nextMask] == -1) {',
        '                dist[nx][ny][nextMask] = dist[cur.x][cur.y][cur.mask] + 1;',
        '                q.push({nx, ny, nextMask});',
        '            }',
        '        }',
        '    }',
        '    if (!found) cout << "无法完成全部配送" << endl;',
        '    return 0;',
        '}',
      ],
    },
    dijkstra: {
      core: [
        'struct State { string node; int mask; int cost; };',
        'priority_queue<State> pending;     // 最小耗时优先',
        'dist[餐厅][0] = 0;                 // 还没送达任何订单',
        'pending.push({餐厅, 0, 0});',
        '',
        'while (!pending.empty()) {',
        '    State cur = pending.top(); pending.pop();',
        '    if (cur.mask == 全部订单) break;',
        '',
        '    for (每一条相邻道路) {',
        '        nextMask = cur.mask | 这条路上的客户;',
        '        nextCost = cur.cost + road.minutes;',
        '        if (nextCost < dist[next][nextMask]) {',
        '            dist[next][nextMask] = nextCost;',
        '            pending.push({next, nextMask, nextCost});',
        '        }',
        '    }',
        '}',
        '第一次取出的“全部送达”状态，就是最优方案。',
      ],
      full: [
        '#include <iostream>',
        '#include <queue>',
        '#include <string>',
        '#include <unordered_map>',
        'using namespace std;',
        '',
        'struct State { string node; int mask, cost; };',
        'struct Compare {',
        '    bool operator()(const State& a, const State& b) {',
        '        return a.cost > b.cost;',
        '    }',
        '};',
        '',
        'priority_queue<State, vector<State>, Compare> pending;',
        'unordered_map<string, int> dist;',
        'int fullMask = (1 << customerCount) - 1;',
        '',
        'pending.push({"S", 0, 0});',
        'dist["S|0"] = 0;',
        '',
        'while (!pending.empty()) {',
        '    State cur = pending.top(); pending.pop();',
        '    string curKey = cur.node + "|" + to_string(cur.mask);',
        '    if (cur.cost != dist[curKey]) continue;',
        '    if (cur.mask == fullMask) {',
        '        cout << "最优耗时: " << cur.cost << " 分钟" << endl;',
        '        break;',
        '    }',
        '',
        '    for (Road road : graph[cur.node]) {',
        '        int nextMask = cur.mask | customerBit[road.to];',
        '        int nextCost = cur.cost + road.minutes;',
        '        string nextKey = road.to + "|" + to_string(nextMask);',
        '        if (!dist.count(nextKey) || nextCost < dist[nextKey]) {',
        '            dist[nextKey] = nextCost;',
        '            pending.push({road.to, nextMask, nextCost});',
        '        }',
        '    }',
        '}',
      ],
    },
    kruskal: {
      core: [
        'struct Edge { int a, b, w; };',
        'bool cmp(Edge x, Edge y) {',
        '    return x.w < y.w;',
        '}',
        '',
        'sort(e, e + m, cmp);',
        'int total = 0, cnt = 0;',
        '',
        'for (int i = 0; i < m; i++) {',
        '    int a = findRoot(e[i].a);',
        '    int b = findRoot(e[i].b);',
        '    if (a == b) continue;          // 会形成环',
        '    parent[a] = b;',
        '    total += e[i].w;',
        '    cnt++;',
        '    if (cnt == n - 1) break;',
        '}',
        'cout << total << endl;',
      ],
      full: [
        '#include <algorithm>',
        '#include <iostream>',
        'using namespace std;',
        '',
        'struct Edge { int a, b, w; };',
        'Edge e[100];',
        'int parent[100];',
        '',
        'int findRoot(int x) {',
        '    while (parent[x] != x) x = parent[x];',
        '    return x;',
        '}',
        '',
        'bool cmp(Edge x, Edge y) {',
        '    return x.w < y.w;',
        '}',
        '',
        'int main() {',
        '    int n, m;',
        '    cin >> n >> m;',
        '    for (int i = 0; i < m; i++)',
        '        cin >> e[i].a >> e[i].b >> e[i].w;',
        '    for (int i = 0; i < n; i++) parent[i] = i;',
        '',
        '    sort(e, e + m, cmp);',
        '    int total = 0, cnt = 0;',
        '    for (int i = 0; i < m; i++) {',
        '        int a = findRoot(e[i].a);',
        '        int b = findRoot(e[i].b);',
        '        if (a == b) {',
        '            cout << "跳过：会形成环" << endl;',
        '            continue;',
        '        }',
        '        parent[a] = b;',
        '        total += e[i].w;',
        '        cnt++;',
        '        if (cnt == n - 1) break;',
        '    }',
        '',
        '    cout << "最小布线成本: " << total << endl;',
        '    return 0;',
        '}',
      ],
    },
  },
};

const CODE_LINE_MAP = {
  newton: {
    core: { initial: 2, other: 6, average: 7, output: 8 },
    full: { initial: 7, other: 11, average: 12, output: 13 },
  },
  dfs: {
    dfs: {
      core: { initial: 1, visit: 4, deliver: 5, complete: 2, move: 9, return: 9, backtrack: 13, failure: 2 },
      full: { initial: 55, visit: 25, deliver: 28, complete: 31, move: 36, return: 37, backtrack: 40, failure: 57 },
    },
    bfs: {
      core: { initial: 2, candidate: 7, shortest: 14, failure: 14 },
      full: { initial: 29, candidate: 48, shortest: 38, failure: 54 },
    },
    dijkstra: {
      core: { initial: 3, pop: 7, relax: 13, complete: 9 },
      full: { initial: 18, pop: 23, relax: 34, complete: 27 },
    },
    kruskal: {
      core: { initial: 6, consider: 9, skip: 12, add: 13, complete: 18 },
      full: { initial: 25, consider: 27, skip: 30, add: 34, complete: 40 },
    },
  },
};

const newtonPresets = [
  { area: 4, label: '完全平方数' },
  { area: 6, label: '长小数结果' },
  { area: 10, label: '长小数结果' },
  { area: 13, label: '质数' },
  { area: 10007, label: '大质数' },
];

const state = {
  activeDemo: 'newton',
  newtonPreset: 0,
  newtonSteps: [],
  newtonIndex: 0,
  mazeKey: 'campus',
  dfsSteps: [],
  dfsIndex: 0,
  playing: false,
  timer: null,
  speed: 300,
  codePanelOpen: { newton: false, dfs: false },
  codeMode: { newton: 'core', dfs: 'core' },
  codePhase: { dfs: 'kruskal' },
  codeEditing: { newton: false, dfs: false },
  codeLines: {
    newton: { core: [...CODE_DEFAULTS.newton.core], full: [...CODE_DEFAULTS.newton.full] },
    dfs: {
      dfs: { core: [...CODE_DEFAULTS.dfs.dfs.core], full: [...CODE_DEFAULTS.dfs.dfs.full] },
      bfs: { core: [...CODE_DEFAULTS.dfs.bfs.core], full: [...CODE_DEFAULTS.dfs.bfs.full] },
      dijkstra: { core: [...CODE_DEFAULTS.dfs.dijkstra.core], full: [...CODE_DEFAULTS.dfs.dijkstra.full] },
      kruskal: { core: [...CODE_DEFAULTS.dfs.kruskal.core], full: [...CODE_DEFAULTS.dfs.kruskal.full] },
    },
  },
  mazePhase: 'dfs',
  routeData: null,
  routeSteps: [],
  routeIndex: 0,
  guessEdges: new Set(),
};

const $ = (selector) => document.querySelector(selector);

function formatNumber(value) {
  if (Math.abs(value - Math.round(value)) < 1e-9) return String(Math.round(value));
  return value.toFixed(6);
}

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function highlightCode(value) {
  let html = escapeHtml(value);
  html = html.replace(/(\/\/.*)$/g, '<span class="code-comment">$1</span>');
  html = html.replace(/\b(double|int|bool|void|for|if|return|true|false|char|const|using|namespace|include|vector|string|auto)\b/g, '<span class="code-keyword">$1</span>');
  html = html.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="code-number">$1</span>');
  return html;
}

function renderCode(target, demo, semanticLine) {
  const phase = demo === 'dfs' ? state.codePhase.dfs : null;
  const mode = state.codeMode[demo];
  const codeLines = phase ? state.codeLines[demo][phase] : state.codeLines[demo];
  const lines = codeLines[mode];
  const lineMap = phase ? CODE_LINE_MAP[demo][phase][mode] : CODE_LINE_MAP[demo][mode];
  const currentLine = lineMap[semanticLine] || 0;
  const editing = state.codeEditing[demo];
  target.innerHTML = lines.map((line, index) => {
    const lineNumber = index + 1;
    const current = currentLine === lineNumber ? ' is-current' : '';
    const content = editing ? escapeHtml(line) || '&nbsp;' : highlightCode(line) || '&nbsp;';
    return `<div class="code-line${current}"><span class="line-number">${lineNumber}</span><span class="code-text" data-code-demo="${demo}" data-code-phase="${phase || 'newton'}" data-code-line="${lineNumber}" contenteditable="${editing}" spellcheck="false">${content}</span></div>`;
  }).join('');
  const toggle = document.querySelector(`[data-code-toggle="${demo}"]`);
  if (toggle) toggle.textContent = editing ? '完成编辑' : '编辑代码';
  document.querySelectorAll(`[data-code-tab-demo="${demo}"]`).forEach((tab) => {
    const active = tab.dataset.codeMode === mode;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  const phaseTag = target.closest('.code-panel')?.querySelector('.language-tag');
  if (phaseTag && demo === 'dfs') phaseTag.textContent = phase === 'kruskal' ? 'Kruskal · C++98' : phase === 'dijkstra' ? 'Dijkstra · C++98' : phase.toUpperCase();
}

function setCodePanelOpen(demo, open) {
  state.codePanelOpen[demo] = open;
  const workspace = document.querySelector(`#demo-${demo} .workspace-grid`);
  const panel = document.querySelector(`#${demo}-code-panel`);
  const opener = document.querySelector(`[data-code-open="${demo}"]`);
  if (workspace) workspace.classList.toggle('code-collapsed', !open);
  if (panel) panel.classList.toggle('is-hidden', !open);
  if (opener) opener.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (!open) state.codeEditing[demo] = false;
  renderActive();
}

function newtonStepsFor(preset) {
  const steps = [];
  let x = 1;
  const history = [x];
  const eps = 0.000001;
  const add = (line, type, message, thought, values = {}) => {
    steps.push({ line, type, message, thought, n: preset.area, x, other: preset.area / x, history: [...history], ...values });
  };
  add('initial', 'initial', `初始猜想 x₀ = 1，当前矩形是 1 × ${formatNumber(preset.area)}。`, '先大胆猜一个边长。程序不要求一开始就猜对，而是准备不断修正。');
  for (let i = 0; i < 10; i += 1) {
    const other = preset.area / x;
    add('other', 'other', `如果一条边是 ${formatNumber(x)}，另一条边就是 ${formatNumber(other)}。`, '矩形面积必须保持为 N，所以另一条边可以用 N / x 算出来。先不要急着取整。', { iteration: i });
    x = (x + other) / 2;
    history.push(x);
    add('average', 'average', `两条边取平均，得到下一次猜想：${formatNumber(x)}。`, '新的猜测同时参考了原来的 x 和另一条边，通常会更接近答案。', { iteration: i + 1 });
    const gap = Math.abs(x - preset.area / x);
    add('output', 'output', `第 ${i + 1} 次修正完成，差距为 ${formatNumber(gap)}。`, gap < eps ? '两条边已经足够接近，程序停止。' : '差距还没有达到停止条件，程序继续下一轮。', { iteration: i + 1 });
    if (gap < eps) break;
  }
  return steps;
}

function renderNewtonPresets() {
  $('#newton-presets').innerHTML = newtonPresets.map((item, index) => `
    <button class="preset-button newton-preset${index === state.newtonPreset ? ' is-selected' : ''}" data-index="${index}">
      <span class="preset-number">${String(index + 1).padStart(2, '0')}</span>
      <span><strong>${item.area}</strong><small>${item.label}</small></span>
    </button>
  `).join('');
  document.querySelectorAll('.newton-preset').forEach((button) => {
    button.addEventListener('click', () => {
      state.newtonPreset = Number(button.dataset.index);
      stopPlayback();
      state.newtonSteps = newtonStepsFor(newtonPresets[state.newtonPreset]);
      state.newtonIndex = 0;
      renderNewtonPresets();
      renderNewton();
    });
  });
}

function renderNewton() {
  const preset = newtonPresets[state.newtonPreset];
  const step = state.newtonSteps[state.newtonIndex];
  const x = step.x;
  const other = step.other;
  const gap = Math.abs(x - other);
  const iteration = step.iteration || 0;
  const maxWidth = 260;
  const maxHeight = 142;
  const scale = Math.min(maxWidth / Math.max(x, 0.0001), maxHeight / Math.max(other, 0.0001));
  const width = Math.max(25, x * scale);
  const height = Math.max(25, other * scale);
  const rectX = 545 - width / 2;
  const rectY = 207 - height / 2;

  $('#newton-area-heading').textContent = formatNumber(preset.area);
  $('#target-square').setAttribute('x', 86);
  $('#target-square').setAttribute('y', 135);
  $('#target-square').setAttribute('width', 150);
  $('#target-square').setAttribute('height', 150);
  $('#target-area-label').setAttribute('x', 161);
  $('#target-area-label').setAttribute('y', 216);
  $('#target-area-label').textContent = `面积 ${formatNumber(preset.area)}`;
  $('#target-side-label').textContent = `理想边长：${formatNumber(Math.sqrt(preset.area))}`;
  $('#rectangle-shape').setAttribute('x', rectX);
  $('#rectangle-shape').setAttribute('y', rectY);
  $('#rectangle-shape').setAttribute('width', width);
  $('#rectangle-shape').setAttribute('height', height);
  $('#rectangle-area-label').setAttribute('x', 545);
  $('#rectangle-area-label').setAttribute('y', 302);
  $('#rectangle-area-label').textContent = `面积保持为 ${formatNumber(preset.area)}`;
  $('#rectangle-long-label').setAttribute('x', 545);
  $('#rectangle-long-label').setAttribute('y', Math.max(105, rectY - 14));
  $('#rectangle-long-label').textContent = `x = ${formatNumber(x)}`;
  $('#rectangle-short-label').setAttribute('x', 742);
  $('#rectangle-short-label').setAttribute('y', 125);
  $('#rectangle-short-label').textContent = `N / x = ${formatNumber(other)}`;
  $('#newton-round-label').textContent = iteration ? `第 ${iteration} 次修正` : '初始猜想 x₀ = 1';
  $('#newton-step-chip').textContent = `${state.newtonIndex + 1} / ${state.newtonSteps.length}`;
  $('#newton-explanation').textContent = step.message;
  $('#newton-thought').textContent = step.thought;
  $('#newton-x').textContent = formatNumber(x);
  $('#newton-other').textContent = formatNumber(other);
  $('#newton-gap').textContent = formatNumber(gap);
  $('#newton-iteration').textContent = iteration;
  if (state.newtonIndex === state.newtonSteps.length - 1) {
    $('#newton-result-label').textContent = preset.area === 4 ? '√4 = 2' : `√${formatNumber(preset.area)} ≈ ${formatNumber(x)}`;
  } else {
    $('#newton-result-label').textContent = '进行中';
  }
  renderCode($('#newton-code'), 'newton', step.line);
  const maxHistory = Math.max(...step.history);
  $('#newton-history').innerHTML = step.history.map((value, index) => {
    const heightValue = 8 + (value / maxHistory) * 29;
    return `<span class="history-bar${index === step.history.length - 1 ? ' is-last' : ''}" style="height:${heightValue}px" title="${formatNumber(value)}"></span>`;
  }).join('');
  updatePlaybackControls();
}

const deliveryScenarios = {
  campus: {
    label: '校园基础网络',
    subtitle: '6 栋建筑 · 10 条候选网线 · 数字代表长度（米）',
    start: 'S',
    nodes: {
      S: { x: 90, y: 280, label: '网络中心', kind: 'start' },
      A: { x: 260, y: 110, label: '教学楼', kind: 'building' },
      B: { x: 550, y: 90, label: '图书馆', kind: 'building' },
      C: { x: 260, y: 470, label: '实验楼', kind: 'building' },
      D: { x: 620, y: 470, label: '宿舍', kind: 'building' },
      E: { x: 820, y: 270, label: '体育馆', kind: 'building' },
    },
    edges: [
      { a: 'A', b: 'B', weight: 2, labelX: 405, labelY: 100 },
      { a: 'D', b: 'E', weight: 2, labelX: 735, labelY: 380 },
      { a: 'B', b: 'C', weight: 3, labelX: 460, labelY: 215 },
      { a: 'C', b: 'D', weight: 4, labelX: 440, labelY: 440 },
      { a: 'S', b: 'A', weight: 5, labelX: 155, labelY: 185 },
      { a: 'A', b: 'D', weight: 3, labelX: 365, labelY: 205 },
      { a: 'B', b: 'E', weight: 7, labelX: 700, labelY: 165 },
      { a: 'S', b: 'C', weight: 8, labelX: 145, labelY: 390 },
      { a: 'S', b: 'B', weight: 8, labelX: 340, labelY: 35, cubic: { c1: { x: 125, y: 25 }, c2: { x: 405, y: -20 } } },
      { a: 'C', b: 'E', weight: 9, labelX: 525, labelY: 555, cubic: { c1: { x: 380, y: 610 }, c2: { x: 700, y: 600 } } },
    ],
  },
  neighborhood: {
    label: '小区供电网络',
    subtitle: '7 个节点 · 13 条候选线路 · 中心放射结构',
    start: 'S',
    nodes: {
      S: { x: 450, y: 310, label: '变电站', kind: 'start' },
      A: { x: 170, y: 105, label: '1 号楼', kind: 'building' },
      B: { x: 450, y: 70, label: '2 号楼', kind: 'building' },
      C: { x: 750, y: 150, label: '3 号楼', kind: 'building' },
      D: { x: 760, y: 470, label: '4 号楼', kind: 'building' },
      E: { x: 450, y: 570, label: '5 号楼', kind: 'building' },
      F: { x: 150, y: 450, label: '6 号楼', kind: 'building' },
    },
    edges: [
      { a: 'S', b: 'A', weight: 2, labelX: 290, labelY: 205 },
      { a: 'S', b: 'B', weight: 3, labelX: 490, labelY: 185 },
      { a: 'S', b: 'C', weight: 4, labelX: 610, labelY: 235 },
      { a: 'S', b: 'D', weight: 5, labelX: 615, labelY: 395 },
      { a: 'S', b: 'E', weight: 6, labelX: 450, labelY: 445 },
      { a: 'S', b: 'F', weight: 7, labelX: 285, labelY: 390 },
      { a: 'A', b: 'B', weight: 3, labelX: 305, labelY: 70 },
      { a: 'B', b: 'C', weight: 5, labelX: 610, labelY: 95 },
      { a: 'C', b: 'D', weight: 6, labelX: 790, labelY: 310 },
      { a: 'D', b: 'E', weight: 7, labelX: 610, labelY: 535 },
      { a: 'E', b: 'F', weight: 8, labelX: 285, labelY: 520 },
      { a: 'F', b: 'A', weight: 9, labelX: 110, labelY: 280 },
      { a: 'B', b: 'E', weight: 10, labelX: 505, labelY: 330, curve: { x: 580, y: 315 } },
    ],
  },
  city: {
    label: '城市应急通信',
    subtitle: '8 个节点 · 15 条候选线路 · 城市网格结构',
    start: 'S',
    nodes: {
      S: { x: 100, y: 315, label: '指挥中心', kind: 'start' },
      A: { x: 275, y: 110, label: '医院', kind: 'building' },
      B: { x: 500, y: 105, label: '警务站', kind: 'building' },
      C: { x: 730, y: 110, label: '消防站', kind: 'building' },
      D: { x: 275, y: 335, label: '避难所', kind: 'building' },
      E: { x: 500, y: 335, label: '中继站', kind: 'building' },
      F: { x: 730, y: 335, label: '体育馆', kind: 'building' },
      G: { x: 500, y: 560, label: '学校', kind: 'building' },
    },
    edges: [
      { a: 'A', b: 'B', weight: 2, labelX: 385, labelY: 75 },
      { a: 'B', b: 'C', weight: 2, labelX: 615, labelY: 75 },
      { a: 'D', b: 'E', weight: 3, labelX: 385, labelY: 300 },
      { a: 'E', b: 'F', weight: 3, labelX: 615, labelY: 300 },
      { a: 'E', b: 'G', weight: 4, labelX: 535, labelY: 450 },
      { a: 'S', b: 'D', weight: 5, labelX: 180, labelY: 325 },
      { a: 'A', b: 'D', weight: 5, labelX: 245, labelY: 220 },
      { a: 'B', b: 'E', weight: 6, labelX: 500, labelY: 220 },
      { a: 'C', b: 'F', weight: 6, labelX: 745, labelY: 220 },
      { a: 'S', b: 'A', weight: 7, labelX: 175, labelY: 190 },
      { a: 'D', b: 'G', weight: 7, labelX: 365, labelY: 450 },
      { a: 'B', b: 'F', weight: 8, labelX: 620, labelY: 230, curve: { x: 690, y: 210 } },
      { a: 'A', b: 'E', weight: 8, labelX: 375, labelY: 225, curve: { x: 385, y: 300 } },
      { a: 'S', b: 'B', weight: 9, labelX: 300, labelY: 45, cubic: { c1: { x: 150, y: -15 }, c2: { x: 390, y: -10 } } },
      { a: 'C', b: 'G', weight: 10, labelX: 630, labelY: 430, curve: { x: 760, y: 500 } },
    ],
  },
  district: {
    label: '山区应急通信',
    subtitle: '9 个节点 · 18 条候选线路 · 不规则骨干结构',
    start: 'S',
    nodes: {
      S: { x: 75, y: 320, label: '指挥车', kind: 'start' },
      A: { x: 230, y: 105, label: '山口', kind: 'building' },
      B: { x: 455, y: 105, label: '峰顶', kind: 'building' },
      C: { x: 705, y: 105, label: '北站', kind: 'building' },
      D: { x: 230, y: 330, label: '西坡', kind: 'building' },
      H: { x: 455, y: 330, label: '中继站', kind: 'building' },
      E: { x: 705, y: 330, label: '东站', kind: 'building' },
      F: { x: 230, y: 555, label: '村落', kind: 'building' },
      G: { x: 515, y: 560, label: '峡谷', kind: 'building' },
    },
    edges: [
      { a: 'A', b: 'B', weight: 2, labelX: 340, labelY: 72 },
      { a: 'B', b: 'C', weight: 2, labelX: 585, labelY: 72 },
      { a: 'D', b: 'H', weight: 3, labelX: 340, labelY: 300 },
      { a: 'H', b: 'E', weight: 3, labelX: 585, labelY: 300 },
      { a: 'F', b: 'G', weight: 4, labelX: 370, labelY: 535 },
      { a: 'S', b: 'D', weight: 4, labelX: 150, labelY: 330 },
      { a: 'A', b: 'D', weight: 5, labelX: 215, labelY: 220 },
      { a: 'B', b: 'H', weight: 5, labelX: 455, labelY: 215 },
      { a: 'C', b: 'E', weight: 6, labelX: 705, labelY: 220 },
      { a: 'H', b: 'G', weight: 6, labelX: 500, labelY: 445 },
      { a: 'S', b: 'A', weight: 7, labelX: 150, labelY: 190 },
      { a: 'D', b: 'F', weight: 7, labelX: 215, labelY: 445 },
      { a: 'B', b: 'E', weight: 8, labelX: 600, labelY: 230, curve: { x: 650, y: 285 } },
      { a: 'A', b: 'H', weight: 8, labelX: 350, labelY: 220, curve: { x: 380, y: 265 } },
      { a: 'E', b: 'G', weight: 9, labelX: 650, labelY: 440, curve: { x: 600, y: 470 } },
      { a: 'S', b: 'H', weight: 10, labelX: 300, labelY: 265, curve: { x: 275, y: 250 } },
      { a: 'S', b: 'B', weight: 11, labelX: 285, labelY: 35, cubic: { c1: { x: 130, y: -10 }, c2: { x: 360, y: -5 } } },
      { a: 'C', b: 'G', weight: 12, labelX: 720, labelY: 390, curve: { x: 840, y: 485 } },
    ],
  },
  disconnected: {
    label: '断开的岛屿网络',
    subtitle: '8 个节点 · 10 条候选线路 · 图不连通',
    possible: false,
    start: 'S',
    nodes: {
      S: { x: 80, y: 300, label: '岛屿 A 中心', kind: 'start' },
      A: { x: 220, y: 110, label: '岛屿 A 北站', kind: 'building' },
      B: { x: 430, y: 130, label: '岛屿 A 东站', kind: 'building' },
      C: { x: 320, y: 450, label: '岛屿 A 南站', kind: 'building' },
      E: { x: 620, y: 110, label: '岛屿 B 北站', kind: 'building' },
      F: { x: 820, y: 110, label: '岛屿 B 东站', kind: 'building' },
      G: { x: 800, y: 400, label: '岛屿 B 南站', kind: 'building' },
      H: { x: 620, y: 500, label: '岛屿 B 西站', kind: 'building' },
    },
    edges: [
      { a: 'S', b: 'A', weight: 2, labelX: 130, labelY: 185 },
      { a: 'A', b: 'B', weight: 3, labelX: 325, labelY: 90 },
      { a: 'B', b: 'C', weight: 4, labelX: 425, labelY: 290 },
      { a: 'C', b: 'S', weight: 5, labelX: 175, labelY: 405 },
      { a: 'S', b: 'B', weight: 7, labelX: 260, labelY: 42, cubic: { c1: { x: 130, y: -10 }, c2: { x: 360, y: 0 } } },
      { a: 'E', b: 'F', weight: 2, labelX: 705, labelY: 80 },
      { a: 'F', b: 'G', weight: 3, labelX: 850, labelY: 250 },
      { a: 'G', b: 'H', weight: 4, labelX: 710, labelY: 470 },
      { a: 'H', b: 'E', weight: 5, labelX: 610, labelY: 300 },
      { a: 'E', b: 'G', weight: 6, labelX: 790, labelY: 245, curve: { x: 875, y: 285 } },
    ],
  },
};

function validateDeliveryScenarios() {
  Object.entries(deliveryScenarios).forEach(([scenarioId, scenario]) => {
    const nodeIds = new Set(Object.keys(scenario.nodes));
    const edgeIds = new Set();
    scenario.edges.forEach((edge, index) => {
      const id = edgeId(edge.a, edge.b);
      if (!nodeIds.has(edge.a) || !nodeIds.has(edge.b)) {
        throw new Error(`${scenarioId} 第 ${index + 1} 条线路引用了不存在的节点`);
      }
      if (!Number.isFinite(edge.weight) || edge.weight <= 0) {
        throw new Error(`${scenarioId} ${edge.a}—${edge.b} 的边权必须是正数`);
      }
      if (edgeIds.has(id)) {
        throw new Error(`${scenarioId} 存在重复线路 ${edge.a}—${edge.b}`);
      }
      edgeIds.add(id);
    });
  });
}

validateDeliveryScenarios();

function edgeId(a, b) { return [a, b].sort().join('~'); }

function adjacencyFor(scenario) {
  const adjacency = Object.fromEntries(Object.keys(scenario.nodes).map((node) => [node, []]));
  scenario.edges.forEach((edge) => {
    const id = edgeId(edge.a, edge.b);
    adjacency[edge.a].push({ ...edge, id, from: edge.a, to: edge.b });
    adjacency[edge.b].push({ ...edge, id, from: edge.b, to: edge.a });
  });
  return adjacency;
}

function createDisjointSet(nodes) {
  const parent = Object.fromEntries(nodes.map((node) => [node, node]));
  const find = (node) => parent[node] === node ? node : (parent[node] = find(parent[node]));
  const union = (a, b) => {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA === rootB) return false;
    parent[rootA] = rootB;
    return true;
  };
  return { find, union };
}

function nodesForEdges(scenario, edgeIds) {
  const nodes = new Set();
  scenario.edges.forEach((edge) => {
    if (edgeIds.has(edgeId(edge.a, edge.b))) {
      nodes.add(edge.a);
      nodes.add(edge.b);
    }
  });
  return nodes;
}

function componentCountFor(scenario, dsu) {
  return new Set(Object.keys(scenario.nodes).map((node) => dsu.find(node))).size;
}

function mstStepsFor(scenario) {
  const sortedEdges = scenario.edges.map((edge) => ({ ...edge, id: edgeId(edge.a, edge.b) })).sort((a, b) => a.weight - b.weight);
  const dsu = createDisjointSet(Object.keys(scenario.nodes));
  const accepted = new Set();
  const rejected = new Set();
  const processed = new Set();
  const steps = [];
  const required = Object.keys(scenario.nodes).length - 1;
  let totalWeight = 0;

  const snapshot = (line, type, message, values = {}) => {
    steps.push({
      line, type, message,
      currentEdge: values.currentEdge || null,
      activeEdge: values.currentEdge || null,
      acceptedEdges: new Set(accepted),
      rejectedEdges: new Set(rejected),
      processedEdges: new Set(processed),
      finalEdges: new Set(values.finalEdges || []),
      finalNodes: new Set(values.finalNodes || []),
      currentNodes: new Set(values.currentNodes || []),
      connectedNodes: nodesForEdges(scenario, accepted),
      edgeQueue: sortedEdges.map((edge) => ({
        ...edge,
        status: accepted.has(edge.id) ? '加入' : rejected.has(edge.id) ? '跳过' : edge.id === values.currentEdge ? '检查中' : '待检查',
      })),
      totalWeight,
      selectedCount: accepted.size,
      required,
      componentCount: componentCountFor(scenario, dsu),
      success: values.success ?? componentCountFor(scenario, dsu) === 1,
      decision: values.decision || '',
      reason: values.reason || '',
    });
  };

  snapshot('initial', 'initial', `先点击 ${required} 条你认为应该铺设的网线，再看看程序如何避免形成环。`, {
    decision: '先由你提出一个网络方案',
    reason: scenario.possible === false ? '这张图故意分成多个网络，先想想程序最后会发现什么。' : '目标是让所有建筑连通，同时让网线总长度最短。',
  });

  for (const edge of sortedEdges) {
    processed.add(edge.id);
    const sameComponent = dsu.find(edge.a) === dsu.find(edge.b);
    snapshot('consider', 'consider', `按长度排序，程序现在检查 ${scenario.nodes[edge.a].label} — ${scenario.nodes[edge.b].label}。`, {
      currentEdge: edge.id,
      currentNodes: [edge.a, edge.b],
      decision: `检查 ${scenario.nodes[edge.a].label} — ${scenario.nodes[edge.b].label}（${edge.weight} 米）`,
      reason: `它是剩余候选网线中当前最短的一条。`,
    });
    if (sameComponent) {
      rejected.add(edge.id);
      snapshot('skip', 'skip', `${scenario.nodes[edge.a].label} — ${scenario.nodes[edge.b].label} 被跳过，因为会形成环。`, {
        currentEdge: edge.id,
        currentNodes: [edge.a, edge.b],
        decision: `跳过这条 ${edge.weight} 米网线`,
        reason: '两栋建筑已经通过其他网线连通，再加入它只会形成环，不会接入新的建筑。',
      });
    } else {
      accepted.add(edge.id);
      dsu.union(edge.a, edge.b);
      totalWeight += edge.weight;
      snapshot('add', 'add', `${scenario.nodes[edge.a].label} — ${scenario.nodes[edge.b].label} 被加入网络。`, {
        currentEdge: edge.id,
        currentNodes: [edge.a, edge.b],
        decision: `加入这条 ${edge.weight} 米网线`,
        reason: '两端属于不同网络，加入后能连接更多建筑，而且不会形成环。',
      });
      if (accepted.size === required && componentCountFor(scenario, dsu) === 1) break;
    }
  }

  const finalEdges = new Set(accepted);
  const success = componentCountFor(scenario, dsu) === 1;
  snapshot('complete', success ? 'complete' : 'impossible', success
    ? `所有建筑已经连通，最小生成树总长度为 ${totalWeight} 米。`
    : `候选网线检查完毕，但图中仍有 ${componentCountFor(scenario, dsu)} 个互不连通的网络。`, {
    finalEdges,
    currentNodes: [...nodesForEdges(scenario, finalEdges)],
    finalNodes: [...nodesForEdges(scenario, finalEdges)],
    success,
    decision: success ? `完成：${accepted.size} 条网线连接全部建筑` : `无法完成：仍有 ${componentCountFor(scenario, dsu)} 个网络`,
    reason: success ? '已选中建筑数减一条边，且每次都跳过了会形成环的网线。' : '所有候选网线都检查过了，但不同网络之间没有任何可用连接。',
  });
  return steps;
}

function deliveryPathGeometry(edge, scenario) {
  const from = scenario.nodes[edge.a];
  const to = scenario.nodes[edge.b];
  if (edge.cubic) {
    return `M ${from.x} ${from.y} C ${edge.cubic.c1.x} ${edge.cubic.c1.y}, ${edge.cubic.c2.x} ${edge.cubic.c2.y}, ${to.x} ${to.y}`;
  }
  return edge.curve
    ? `M ${from.x} ${from.y} Q ${edge.curve.x} ${edge.curve.y} ${to.x} ${to.y}`
    : `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
}

function renderDeliveryMap(step) {
  const scenario = deliveryScenarios[state.mazeKey];
  const board = $('#delivery-board');
  const visibleEdges = state.mazePhase === 'shortest' ? step.finalEdges : step.acceptedEdges;
  board.innerHTML = `<g class="delivery-roads">${scenario.edges.map((edge) => {
    const id = edgeId(edge.a, edge.b);
    const classes = ['delivery-road'];
    if (state.mazePhase === 'guess' && state.guessEdges.has(id)) classes.push('is-candidate');
    if (visibleEdges.has(id)) classes.push(state.mazePhase === 'shortest' ? 'is-final' : 'is-candidate');
    if (step.rejectedEdges.has(id)) classes.push('is-rejected');
    if (step.activeEdge === id) classes.push('is-active');
    const labelClasses = ['delivery-road-label'];
    if (state.mazePhase === 'guess' && state.guessEdges.has(id)) labelClasses.push('is-candidate');
    if (visibleEdges.has(id)) labelClasses.push(state.mazePhase === 'shortest' ? 'is-final' : 'is-candidate');
    if (step.rejectedEdges.has(id)) labelClasses.push('is-rejected');
    if (step.activeEdge === id) labelClasses.push('is-active');
    const labelX = edge.labelX;
    const labelY = edge.labelY;
    return `<path class="${classes.join(' ')}" data-edge-id="${id}" d="${deliveryPathGeometry(edge, scenario)}" />
      <g class="${labelClasses.join(' ')}" data-edge-id="${id}" transform="translate(${labelX} ${labelY})" aria-label="${edge.a} 到 ${edge.b}，${edge.weight} 米"><rect x="-36" y="-19" width="72" height="38" rx="8"></rect><text class="delivery-road-label-edge" text-anchor="middle" y="-3">${edge.a}—${edge.b}</text><text class="delivery-road-label-weight" text-anchor="middle" y="13">${edge.weight} 米</text></g>`;
  }).join('')}</g><g class="delivery-nodes">${Object.entries(scenario.nodes).map(([key, node]) => {
    const classes = ['delivery-node'];
    if (node.kind === 'start') classes.push('is-start');
    if (node.kind === 'building') classes.push('is-building');
    if (step.connectedNodes.has(key)) classes.push('is-settled');
    if (step.currentNodes.has(key)) classes.push('is-current');
    if (step.finalNodes.has(key)) classes.push('is-final');
    const shortLabel = node.kind === 'start' ? 'S' : key;
    return `<g class="${classes.join(' ')}" data-node-id="${key}" transform="translate(${node.x} ${node.y})"><circle r="23"></circle><text class="delivery-node-short" text-anchor="middle" y="6">${shortLabel}</text><text class="delivery-node-label" text-anchor="middle" y="43">${node.label}</text></g>`;
  }).join('')}</g>`;
}

function renderMazePresets() {
  const container = $('#maze-presets');
  container.innerHTML = Object.entries(deliveryScenarios).map(([key, item], index) => `<button class="preset-button maze-preset${key === state.mazeKey ? ' is-selected' : ''}" data-maze="${key}"><span class="preset-number">${String.fromCharCode(65 + index)}</span><span><strong>${item.label}</strong><small>${item.subtitle}</small></span></button>`).join('');
  container.querySelectorAll('.maze-preset').forEach((button) => {
    button.addEventListener('click', () => {
      state.mazeKey = button.dataset.maze;
      stopPlayback();
      rebuildMazeState();
      renderMazePresets();
      renderDFS();
    });
  });
}

function rebuildMazeState() {
  const scenario = deliveryScenarios[state.mazeKey];
  state.dfsSteps = mstStepsFor(scenario);
  state.routeData = { sortedEdges: scenario.edges.map((edge) => ({ ...edge, id: edgeId(edge.a, edge.b) })).sort((a, b) => a.weight - b.weight), required: Object.keys(scenario.nodes).length - 1 };
  state.dfsIndex = 0;
  state.routeIndex = 0;
  state.mazePhase = 'guess';
  state.guessEdges = new Set();
  state.codePhase.dfs = 'kruskal';
}

function setMazePhase(phase) {
  state.mazePhase = phase;
  state.codePhase.dfs = 'kruskal';
  if (phase === 'guess') state.dfsIndex = 0;
  if (phase === 'search') state.dfsIndex = Math.min(1, state.dfsSteps.length - 1);
  if (phase === 'shortest') state.dfsIndex = state.dfsSteps.length - 1;
  renderDFS();
}

function renderRouteComparison() {
  const data = state.routeData;
  const scenario = deliveryScenarios[state.mazeKey];
  const comparison = $('#route-comparison');
  comparison.classList.remove('is-hidden');
  const guessWeight = scenario.edges.filter((edge) => state.guessEdges.has(edgeId(edge.a, edge.b))).reduce((sum, edge) => sum + edge.weight, 0);
  const step = state.dfsSteps[state.dfsIndex];
  const impossibleFinal = step.type === 'impossible' || (state.mazePhase === 'shortest' && !step.success);
  const phaseText = state.mazePhase === 'guess'
    ? `请选 ${data.required} 条网线`
    : state.mazePhase === 'search'
      ? 'Kruskal 正在按长度检查候选网线'
      : impossibleFinal ? '程序发现：这张图无法全部连通' : '最小生成树已经完成';
  $('#route-phase-label').textContent = phaseText;
  $('#show-dfs').classList.toggle('is-active', state.mazePhase === 'guess');
  $('#show-routes').classList.toggle('is-active', state.mazePhase === 'search');
  $('#show-shortest').classList.toggle('is-active', state.mazePhase === 'shortest');
  $('#show-shortest').textContent = scenario.possible === false ? '揭晓可行性' : '揭晓最小网络';
  $('#route-comparison-title').textContent = state.mazePhase === 'shortest'
    ? impossibleFinal ? `只能连成 ${step.componentCount} 个网络` : `程序选中 ${data.required} 条网线`
    : `已选 ${state.guessEdges.size} / ${data.required} 条`;
  $('#route-result').textContent = state.mazePhase === 'shortest'
    ? impossibleFinal ? `无法覆盖全部节点 · 已铺 ${step.totalWeight} 米` : `总长度 ${step.totalWeight} 米`
    : `你的方案：${guessWeight} 米`;
  $('#route-list').innerHTML = data.sortedEdges.map((edge, index) => {
    const id = edge.id;
    const selected = state.guessEdges.has(id);
    const accepted = step.acceptedEdges.has(id);
    const rejected = step.rejectedEdges.has(id);
    const status = state.mazePhase === 'guess' ? (selected ? '我的选择' : '点击选择') : accepted ? '加入网络' : rejected ? '形成环，跳过' : '待检查';
    return `<button class="route-card delivery-guess${selected ? ' is-active' : ''}${accepted && state.mazePhase === 'shortest' ? ' is-best' : ''}${rejected ? ' is-rejected' : ''}" data-edge-id="${id}">
      <span class="route-card-top"><strong>${index + 1}. ${scenario.nodes[edge.a].label}—${scenario.nodes[edge.b].label}</strong><span>${edge.weight} 米</span></span>
      <span class="route-card-result">${status}</span>
    </button>`;
  }).join('');
}

function renderDFS() {
  const scenario = deliveryScenarios[state.mazeKey];
  const step = state.dfsSteps[state.dfsIndex];
  const impossibleFinal = step.type === 'impossible' || (state.mazePhase === 'shortest' && !step.success);
  renderDeliveryMap(step);
  $('#maze-title').textContent = `${scenario.label}：${scenario.subtitle}`;
  $('#dfs-step-chip').textContent = `${state.dfsIndex + 1} / ${state.dfsSteps.length}`;
  const currentEdge = scenario.edges.find((edge) => edgeId(edge.a, edge.b) === step.currentEdge);
  $('#dfs-position').textContent = currentEdge ? `${scenario.nodes[currentEdge.a].label}—${scenario.nodes[currentEdge.b].label}` : '等待选边';
  $('#dfs-visited').textContent = step.processedEdges.size;
  $('#dfs-backtracks').textContent = `${step.totalWeight} 米`;
  $('#dfs-status').textContent = state.mazePhase === 'guess'
    ? `${state.guessEdges.size} / ${step.required} 条`
    : impossibleFinal ? `无法连通 · ${step.componentCount} 个网络` : `${step.selectedCount} / ${step.required} 条`;
  $('#path-legend-label').textContent = impossibleFinal ? '已连接部分' : '最小生成树';
  $('#dfs-thought').textContent = step.message;
  $('#delivery-decision').textContent = step.decision || '继续观察当前状态';
  $('#delivery-reason').textContent = step.reason || step.message;
  $('#dfs-stack-label').textContent = '按长度排序的候选网线';
  $('#dfs-stack-count').textContent = `${step.edgeQueue.length} 条`;
  $('#dfs-stack').innerHTML = step.edgeQueue.slice(0, 8).map((edge) => `<span class="stack-item ${edge.status === '加入' ? 'is-accepted' : edge.status === '跳过' ? 'is-rejected' : ''}">${scenario.nodes[edge.a].label}—${scenario.nodes[edge.b].label} · ${edge.weight} 米 · ${edge.status}</span>`).join('');
  renderCode($('#dfs-code'), 'dfs', step.line);
  renderRouteComparison(step);
  updatePlaybackControls();
}

function currentSteps() {
  if (state.activeDemo === 'newton') return state.newtonSteps;
  return state.dfsSteps;
}
function currentIndex() {
  if (state.activeDemo === 'newton') return state.newtonIndex;
  return state.dfsIndex;
}
function setCurrentIndex(value) {
  if (state.activeDemo === 'newton') state.newtonIndex = value;
  else state.dfsIndex = value;
}

function updatePlaybackControls() {
  const steps = currentSteps();
  const index = currentIndex();
  $('#previous-step').disabled = !steps.length || index <= 0;
  $('#next-step').disabled = !steps.length || index >= steps.length - 1;
  $('#toggle-play').disabled = !steps.length;
}

function renderActive() { if (state.activeDemo === 'newton') renderNewton(); else renderDFS(); }

function placePlaybackBar(demo) {
  const bar = $('#playback-bar');
  const anchor = demo === 'dfs' ? document.querySelector('.delivery-board-wrap') : $('#newton-explanation');
  if (bar && anchor) anchor.after(bar);
}

function stepBy(delta) {
  const steps = currentSteps();
  const next = Math.max(0, Math.min(steps.length - 1, currentIndex() + delta));
  setCurrentIndex(next);
  renderActive();
  if (next === steps.length - 1 && delta > 0) stopPlayback('演示完成');
}

function stopPlayback(status = '准备开始') {
  state.playing = false;
  if (state.timer) clearInterval(state.timer);
  state.timer = null;
  $('#play-icon').textContent = '▶';
  $('#play-label').textContent = '播放';
  $('#playback-status').textContent = status;
}

function startPlayback() {
  if (currentIndex() >= currentSteps().length - 1) setCurrentIndex(0);
  state.playing = true;
  $('#play-icon').textContent = 'Ⅱ';
  $('#play-label').textContent = '暂停';
  $('#playback-status').textContent = '正在播放';
  state.timer = setInterval(() => stepBy(1), state.speed);
}

document.querySelectorAll('.demo-tab').forEach((button) => {
  button.addEventListener('click', () => {
    stopPlayback();
    state.activeDemo = button.dataset.demo;
    document.querySelectorAll('.demo-tab').forEach((tab) => tab.classList.toggle('is-active', tab === button));
    document.querySelectorAll('.demo-view').forEach((view) => view.classList.toggle('is-active', view.id === `demo-${state.activeDemo}`));
    placePlaybackBar(state.activeDemo);
    renderActive();
  });
});

$('#previous-step').addEventListener('click', () => stepBy(-1));
$('#next-step').addEventListener('click', () => stepBy(1));
$('#toggle-play').addEventListener('click', () => { if (state.playing) stopPlayback(); else startPlayback(); });
$('#reset-demo').addEventListener('click', () => {
  stopPlayback();
  if (state.activeDemo === 'dfs') {
    state.mazePhase = 'guess';
    state.codePhase.dfs = 'kruskal';
  }
  setCurrentIndex(0);
  renderActive();
});
$('#speed-range').addEventListener('input', (event) => {
  state.speed = Number(event.target.value);
  $('#speed-value').textContent = state.speed < 500 ? '快' : state.speed > 950 ? '慢' : '正常';
  if (state.playing) { stopPlayback(); startPlayback(); }
});

document.addEventListener('click', (event) => {
  const demoJump = event.target.closest('[data-jump-demo]');
  if (demoJump) {
    event.preventDefault();
    const demo = demoJump.dataset.jumpDemo;
    const tab = document.querySelector(`.demo-tab[data-demo="${demo}"]`);
    if (tab) tab.click();
    window.setTimeout(() => {
      document.querySelector(`#demo-${demo}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
    return;
  }
  const infoToggle = event.target.closest('[data-info-toggle]');
  if (infoToggle) {
    const info = document.querySelector(`#${infoToggle.dataset.infoToggle}-algorithm-info`);
    if (info) {
      const open = info.classList.toggle('is-hidden') === false;
      infoToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      infoToggle.textContent = open ? '收起说明' : '算法说明';
    }
    return;
  }
  const routeButton = event.target.closest('.route-button');
  if (routeButton) {
    const phase = routeButton.id === 'show-dfs' ? 'guess' : routeButton.id === 'show-routes' ? 'search' : 'shortest';
    stopPlayback();
    setMazePhase(phase);
    return;
  }
  const edgeTarget = event.target.closest('[data-edge-id]');
  if (edgeTarget && state.activeDemo === 'dfs' && state.mazePhase === 'guess') {
    stopPlayback();
    const id = edgeTarget.dataset.edgeId;
    if (state.guessEdges.has(id)) state.guessEdges.delete(id);
    else if (state.guessEdges.size < state.routeData.required) state.guessEdges.add(id);
    renderDFS();
    return;
  }
  const open = event.target.closest('[data-code-open]');
  if (open) {
    setCodePanelOpen(open.dataset.codeOpen, true);
    return;
  }
  const close = event.target.closest('[data-code-close]');
  if (close) {
    setCodePanelOpen(close.dataset.codeClose, false);
    return;
  }
  const tab = event.target.closest('[data-code-tab-demo]');
  if (tab) {
    const demo = tab.dataset.codeTabDemo;
    state.codeMode[demo] = tab.dataset.codeMode;
    state.codeEditing[demo] = false;
    renderActive();
    return;
  }
  const toggle = event.target.closest('[data-code-toggle]');
  if (toggle) {
    const demo = toggle.dataset.codeToggle;
    state.codeEditing[demo] = !state.codeEditing[demo];
    renderActive();
  }
  const reset = event.target.closest('[data-code-reset]');
  if (reset) {
    const demo = reset.dataset.codeReset;
    const mode = state.codeMode[demo];
    const phase = demo === 'dfs' ? state.codePhase.dfs : null;
    if (phase) state.codeLines[demo][phase][mode] = [...CODE_DEFAULTS[demo][phase][mode]];
    else state.codeLines[demo][mode] = [...CODE_DEFAULTS[demo][mode]];
    state.codeEditing[demo] = false;
    renderActive();
  }
});

document.addEventListener('input', (event) => {
  const line = event.target.closest('[data-code-demo][data-code-line]');
  if (!line) return;
  const demo = line.dataset.codeDemo;
  const mode = state.codeMode[demo];
  const phase = line.dataset.codePhase;
  const index = Number(line.dataset.codeLine) - 1;
  if (demo === 'dfs') state.codeLines[demo][phase][mode][index] = line.innerText.replace(/[\r\n]+/g, '');
  else state.codeLines[demo][mode][index] = line.innerText.replace(/[\r\n]+/g, '');
});

document.addEventListener('keydown', (event) => {
  const demo = state.activeDemo;
  if (event.key === 'Escape') {
    if (state.codePanelOpen[demo]) setCodePanelOpen(demo, false);
    return;
  }

  if (event.target?.closest?.('button, a, summary, input, textarea, select, [contenteditable="true"]')) return;
  // Reading the story should retain normal page-scrolling keys.
  const activeView = document.querySelector('.demo-view.is-active');
  const viewRect = activeView?.getBoundingClientRect();
  if (!viewRect || viewRect.top >= window.innerHeight * 0.75 || viewRect.bottom <= window.innerHeight * 0.25) return;

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    stepBy(-1);
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    stepBy(1);
  } else if (event.key === ' ') {
    event.preventDefault();
    if (state.playing) stopPlayback();
    else startPlayback();
  } else if (event.key.toLowerCase() === 'r') {
    event.preventDefault();
    stopPlayback();
    if (state.activeDemo === 'dfs') {
      state.mazePhase = 'guess';
      state.codePhase.dfs = 'kruskal';
    }
    setCurrentIndex(0);
    renderActive();
  }
});

state.newtonSteps = newtonStepsFor(newtonPresets[0]);
rebuildMazeState();
placePlaybackBar(state.activeDemo);
renderNewtonPresets();
renderMazePresets();
renderNewton();
renderDFS();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
