let ctGameScene = null;

function openGameScene(difficulty) {
  const cfg = DIFFICULTIES[difficulty];
  const board = new Board(cfg.w, cfg.h, cfg.colors);
  let score = 0;
  let stolen = 0;
  let finished = false;

  const scene = odyc.createGame({
    background: '#222529',
    dialogInternvalMs: 5,
    colors: PALETTE,
    cellWidth: 20,
    cellHeight: 20,
    screenWidth: cfg.w,
    screenHeight: cfg.h,
    controls: {
      LEFT: ['KeyA', 'ArrowLeft'],
      RIGHT: ['KeyD', 'ArrowRight'],
      UP: ['KeyW', 'ArrowUp'],
      DOWN: ['KeyS', 'ArrowDown'],
      ACTION: ['Enter', 'Space'],
    },
    templates: {
      '.': { solid: false, sprite: null },
    },
    map: emptyMap(cfg.w, cfg.h),
    player: {
      position: [Math.floor(cfg.w / 2), Math.floor(cfg.h / 2)],
      sprite: CURSOR_SPRITE,
      onInput: (input) => {
        if (input === 'ACTION') steal();
      },
    },
  });
  ctGameScene = scene;

  function render() {
    for (let x = 0; x < cfg.w; x++) {
      for (let y = 0; y < cfg.h; y++) {
        const c = board.get(x, y);
        scene.setCell(x, y, { sprite: c ? GEM_SPRITES[c] : null });
      }
    }
  }

  function steal() {
    if (finished) return;
    const [x, y] = scene.player.position;
    const group = board.steal(x, y);

    if (!group) {
      Sound.play(scene, 'HIT');
      return;
    }

    score += scoreFor(group.length);
    stolen += group.length;
    render();
    Sound.play(scene, 'PICKUP');

    if (board.isEmpty()) {
      score += CLEAR_BONUS;
      finish(true);
    } else if (!board.hasMoves()) {
      finish(false);
    }
  }

  function finish(won) {
    finished = true;
    const prevBest = Store.num('best');
    Store.recordGame({ score, stolen, cleared: won, difficulty });
    const newRecord = score > prevBest;
    Sound.play(scene, won ? 'POWERUP' : 'FALL');

    setTimeout(
      () => openGameOverScene({ won, score, stolen, difficulty, newRecord }),
      won ? 600 : 380,
    );
  }

  render();
}
