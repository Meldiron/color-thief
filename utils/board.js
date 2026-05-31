class Board {
  constructor(width, height, colorCount) {
    this.W = width;
    this.H = height;
    this.palette = COLOR_NAMES.slice(0, colorCount);
    this.grid = [];
    this.reset();
  }

  randomColor() {
    return this.palette[Math.floor(Math.random() * this.palette.length)];
  }

  reset() {
    do {
      this.grid = [];
      for (let x = 0; x < this.W; x++) {
        this.grid[x] = [];
        for (let y = 0; y < this.H; y++) this.grid[x][y] = this.randomColor();
      }
    } while (!this.hasMoves());
  }

  get(x, y) {
    return this.grid[x][y];
  }

  findGroup(sx, sy) {
    const color = this.grid[sx][sy];
    if (!color) return [];
    const seen = new Set();
    const stack = [[sx, sy]];
    const group = [];
    while (stack.length) {
      const [x, y] = stack.pop();
      if (x < 0 || x >= this.W || y < 0 || y >= this.H) continue;
      const key = x + ',' + y;
      if (seen.has(key) || this.grid[x][y] !== color) continue;
      seen.add(key);
      group.push([x, y]);
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    return group;
  }

  steal(x, y) {
    const group = this.findGroup(x, y);
    if (group.length < 2) return null;
    for (const [gx, gy] of group) this.grid[gx][gy] = null;
    this.collapse();
    return group;
  }

  collapse() {
    for (let x = 0; x < this.W; x++) {
      const remaining = this.grid[x].filter((c) => c !== null);
      this.grid[x] = [
        ...Array(this.H - remaining.length).fill(null),
        ...remaining,
      ];
    }
    const cols = this.grid.filter((col) => col.some((c) => c !== null));
    while (cols.length < this.W) cols.push(Array(this.H).fill(null));
    this.grid = cols;
  }

  isEmpty() {
    return this.grid.every((col) => col.every((c) => c === null));
  }

  hasMoves() {
    for (let x = 0; x < this.W; x++) {
      for (let y = 0; y < this.H; y++) {
        const c = this.grid[x][y];
        if (!c) continue;
        if ((x + 1 < this.W && this.grid[x + 1][y] === c) ||
            (y + 1 < this.H && this.grid[x][y + 1] === c)) {
          return true;
        }
      }
    }
    return false;
  }
}
