async function openStatsScene() {
  const scene = createBaseGame();

  const best = Store.num('best');
  const games = Store.num('games');
  const stolen = Store.num('stolen');
  const vaults = Store.num('vaults');

  await scene.openMessage(
    `<1>STATISTICS<1>\n\n` +
      `Best haul       <1>${best}<1>\n` +
      `Heists played   <0>${games}<0>\n` +
      `Gems stolen     <0>${stolen}<0>\n` +
      `Vaults cleared  <3>${vaults}<3>\n\n` +
      `<2>best by difficulty<2>\n` +
      `Easy ${Store.num('best_easy')}  Med ${Store.num('best_medium')}  Hard ${Store.num('best_hard')}\n\n\n` +
      `<3>press SPACE to go back<3>`,
  );

  openMenuScene();
}
