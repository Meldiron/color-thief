function indexToChar(i) {
  return i < 10 ? String(i) : String.fromCharCode(97 + (i - 10));
}

const GEM_DEFS = {
  green:  { shape: 'diamond', shades: ['#377a20', '#59c135', '#73df4e', '#dae6ff', '#489f29', '#53b531'] },
  blue:   { shape: 'circle',  shades: ['#224a9a', '#3871e4', '#769be4', '#dae6ff', '#285cc4', '#5589ef'] },
  red:    { shape: 'square',  shades: ['#75141a', '#ca2d38', '#df3b46', '#dae6ff', '#9a131d', '#b4202a'] },
  yellow: { shape: 'star',    shades: ['#bab715', '#efec17', '#fffc40', '#dae6ff', '#cac722', '#e4e11b'] },
};
const COLOR_NAMES = ['green', 'blue', 'red', 'yellow'];

const UI_COLORS = ['#dae6ff', '#fdcc34', '#8a9099', '#59c135', '#3871e4', '#df3b46', '#fffc40'];

const PALETTE = UI_COLORS.slice();
const GEM_SYMBOLS = {};
for (const name of COLOR_NAMES) {
  const start = PALETTE.length;
  PALETTE.push(...GEM_DEFS[name].shades);
  GEM_SYMBOLS[name] = GEM_DEFS[name].shades.map((_, k) => indexToChar(start + k));
}

function makeGemSprite(name) {
  const symbols = GEM_SYMBOLS[name];
  let rows = gameConfig.sprites[GEM_DEFS[name].shape]
    .split('\n')
    .map((r) => r.trim())
    .filter((r) => r.length > 0);

  const blank = '.'.repeat(20);
  rows = rows.map((r) => '..' + r + '..');
  rows = [blank, blank, ...rows, blank, blank];

  return rows
    .join('\n')
    .split('')
    .map((ch) => (ch >= '0' && ch <= '5' ? symbols[+ch] : ch))
    .join('');
}

const GEM_SPRITES = {};
for (const name of COLOR_NAMES) GEM_SPRITES[name] = makeGemSprite(name);
