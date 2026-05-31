const Store = {
  num(key) {
    return +(localStorage.getItem('ct_' + key) || '0');
  },
  setNum(key, value) {
    localStorage.setItem('ct_' + key, String(value));
  },
  str(key, fallback) {
    const v = localStorage.getItem('ct_' + key);
    return v === null ? fallback : v;
  },
  setStr(key, value) {
    localStorage.setItem('ct_' + key, value);
  },

  recordGame({ score, stolen, cleared, difficulty }) {
    this.setNum('games', this.num('games') + 1);
    this.setNum('stolen', this.num('stolen') + stolen);
    if (cleared) this.setNum('vaults', this.num('vaults') + 1);
    if (score > this.num('best')) this.setNum('best', score);
    const dk = 'best_' + difficulty;
    if (score > this.num(dk)) this.setNum(dk, score);
  },
};
