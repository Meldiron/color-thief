// ===== Color Thief — welcome / title splash =====
async function openWelcomeScene() {
  const scene = createBaseGame();
  const best = Store.num('best');

  await scene.openMessage(
    `<9>COLOR THIEF<9>\n<7>a gem-heist puzzle<7>\n\n\n` +
      `Crack the vault and steal all the gems you possibly can.\n\n` +
      `<2>Press SPACE to start<2>`,
  );

  openMenuScene();
}
