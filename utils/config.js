// ===== Color Thief — game config & shared scene helpers =====

// Difficulty tunes the vault size and how many gem colors are in play.
// Fewer colors are easier to clear; the bigger vault is the real challenge.
const DIFFICULTIES = {
  easy:   { key: 'easy',   label: 'Easy',   w: 5, h: 7, colors: 3 },
  medium: { key: 'medium', label: 'Medium', w: 5, h: 7, colors: 4 },
  hard:   { key: 'hard',   label: 'Hard',   w: 6, h: 8, colors: 4 },
};

// Score rewards big hauls: a pair scores 20, a 5-cluster 200, a 10-cluster 900.
function scoreFor(groupSize) {
  return groupSize * (groupSize - 1) * 10;
}
const CLEAR_BONUS = 1000;

// Gold corner-bracket cursor (palette index 1 -> char '1'); hollow center so
// the gem underneath shows through the selection frame.
const CURSOR_SPRITE = [
  '111..............111',
  '1.1..............1.1',
  '1..................1',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '1..................1',
  '1.1..............1.1',
  '111..............111',
  '....................',
].join('\n');

// A map filled with the transparent base tile '.', one actor per cell.
function emptyMap(w, h) {
  return Array.from({ length: h }, () => '.'.repeat(w)).join('\n');
}

// Shared theming for every menu / dialog / message screen. Each of those
// scenes is a throwaway game whose only job is to host a prompt or message,
// so we also tidy up the in-game HUD and tab title here.
function createBaseGame(extra) {
  return odyc.createGame(
    Object.assign(
      {
        background: '#222529',
        dialogBackground: '#222529',
        dialogColor: '#dae6ff',
        dialogBorder: '#f8f9fa',
        messageBackground: '#222529',
        messageColor: '#dae6ff',
        dialogInternvalMs: 5, // fast typewriter
        colors: PALETTE,
        player: { sprite: '' },
      },
      extra || {},
    ),
  );
}
