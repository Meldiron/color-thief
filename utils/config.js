const DIFFICULTIES = {
  easy:   { key: 'easy',   label: 'Easy',   w: 5, h: 7, colors: 3 },
  medium: { key: 'medium', label: 'Medium', w: 5, h: 7, colors: 4 },
  hard:   { key: 'hard',   label: 'Hard',   w: 6, h: 8, colors: 4 },
};

function scoreFor(groupSize) {
  return groupSize * (groupSize - 1) * 10;
}
const CLEAR_BONUS = 1000;

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

function emptyMap(w, h) {
  return Array.from({ length: h }, () => '.'.repeat(w)).join('\n');
}

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
        dialogInternvalMs: 5,
        colors: PALETTE,
        player: { sprite: '' },
      },
      extra || {},
    ),
  );
}
