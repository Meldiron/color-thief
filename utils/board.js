// ===== Color Thief — board model (pure game logic, no rendering) =====
// A SameGame / collapse board: steal a connected cluster of same-colored gems,
// the rest fall down, and emptied columns slide left.
//   grid[x][y] = color name | null   (y = 0 top; gravity pulls toward y = H-1)
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

  // Fill the vault, re-rolling until at least one legal move exists so the
  // player never opens onto a dead board.
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

  // Flood-fill the connected (4-directional) cluster of same-colored gems.
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

  // Steal the cluster at (x, y) if it's 2+ gems, then collapse.
  // Returns the stolen group, or null if the move was illegal.
  steal(x, y) {
    const group = this.findGroup(x, y);
    if (group.length < 2) return null;
    for (const [gx, gy] of group) this.grid[gx][gy] = null;
    this.collapse();
    return group;
  }

  // Gravity within each column, then drop fully-empty columns and slide the
  // rest to the left.
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

  // Any cluster of 2+ left to take?
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
