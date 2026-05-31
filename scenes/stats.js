async function openStatsScene() {
  const scene = createBaseGame();

  const best = Store.num('best');
  const games = Store.num('games');
  const stolen = Store.num('stolen');
  const vaults = Store.num('vaults');

  await scene.openMessage(
    `<9>STATISTICS<9>\n\n` +
      `Best loot: <0>${best}<0>\n` +
      `Heists played: <0>${games}<0>\n` +
      `Gems stolen: <0>${stolen}<0>\n` +
      `Vaults cleared: <0>${vaults}<0>\n\n` +
      `<2>By difficulty<2>\n` +
      `Easy: ${Store.num('best_easy')}\nMedium: ${Store.num('best_medium')}\nHard: ${Store.num('best_hard')}\n\n\n` +
      `<2>Press SPACE to go back<2>`,
  );

  openMenuScene();
}
