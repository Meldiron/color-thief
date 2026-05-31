// ===== Color Thief — palette & gem sprites =====
// Sprite/dialog characters are single-char indexes into the `colors` palette,
// using the engine's base order: 0-9 then a-z. indexToChar maps an index there.
function indexToChar(i) {
  return i < 10 ? String(i) : String.fromCharCode(97 + (i - 10));
}

// Each color owns a fixed shape so the board reads clearly (and stays
// distinguishable for color-blind players). Shades go: border / bright /
// brightest / shine / darkest / dark — matching the 0-5 digits in the shapes.
const GEM_DEFS = {
  green:  { shape: 'diamond', shades: ['#377a20', '#59c135', '#73df4e', '#dae6ff', '#489f29', '#53b531'] },
  blue:   { shape: 'circle',  shades: ['#224a9a', '#3871e4', '#769be4', '#dae6ff', '#285cc4', '#5589ef'] },
  red:    { shape: 'square',  shades: ['#75141a', '#ca2d38', '#df3b46', '#dae6ff', '#9a131d', '#b4202a'] },
  yellow: { shape: 'star',    shades: ['#bab715', '#efec17', '#fffc40', '#dae6ff', '#cac722', '#e4e11b'] },
};
const COLOR_NAMES = ['green', 'blue', 'red', 'yellow'];

// UI colors come first so they're reachable as single-char dialog tags:
//   <0> white  <1> gold  <2> grey  <3> green  <4> blue  <5> red  <6> yellow
const UI_COLORS = ['#dae6ff', '#fdcc34', '#8a9099', '#59c135', '#3871e4', '#df3b46', '#fffc40'];

// Full palette = UI colors, then each gem's six shades appended in order.
// GEM_SYMBOLS records the char each shade lands on, so sprites can reference them.
const PALETTE = UI_COLORS.slice();
const GEM_SYMBOLS = {};
for (const name of COLOR_NAMES) {
  const start = PALETTE.length;
  PALETTE.push(...GEM_DEFS[name].shades);
  GEM_SYMBOLS[name] = GEM_DEFS[name].shades.map((_, k) => indexToChar(start + k));
}

// Build a 20x20 gem sprite from its 16x16 shape (drawn with shades 0-5),
// recolored to the requested gem and centered with a 2px transparent border.
function makeGemSprite(name) {
  const symbols = GEM_SYMBOLS[name];
  let rows = gameConfig.sprites[GEM_DEFS[name].shape]
    .split('\n')
    .map((r) => r.trim())
    .filter((r) => r.length > 0); // 16 rows of 16 chars

  const blank = '.'.repeat(20);
  rows = rows.map((r) => '..' + r + '..');       // 16 -> 20 wide
  rows = [blank, blank, ...rows, blank, blank];   // 16 -> 20 tall

  return rows
    .join('\n')
    .split('')
    .map((ch) => (ch >= '0' && ch <= '5' ? symbols[+ch] : ch))
    .join('');
}

// Precompute every gem sprite once.
const GEM_SPRITES = {};
for (const name of COLOR_NAMES) GEM_SPRITES[name] = makeGemSprite(name);
