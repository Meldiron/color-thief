// ===== Color Thief — heist results =====
async function openGameOverScene({ won, score, stolen, difficulty, newRecord }) {
  const scene = createBaseGame();
  const recordLine = newRecord ? '<1>NEW BEST!<1>\n\n' : '';

  if (won) {
    await scene.openMessage(
      `<3>VAULT CLEARED!<3>\n\n` +
        `A flawless heist - you emptied\nthe entire vault.\n\n` +
        `Score <1>${score}<1>\nGems stolen <0>${stolen}<0>\n\n` +
        `${recordLine}<3>press SPACE<3>`,
    );
  } else {
    await scene.openMessage(
      `<5>NO MOVES LEFT<5>\n\n` +
        `The vault is picked clean\nof easy pickings.\n\n` +
        `Score <1>${score}<1>\nGems stolen <0>${stolen}<0>\n\n` +
        `${recordLine}<3>press SPACE<3>`,
    );
  }

  const choice = await scene.prompt('Play again', 'Main menu');
  if (choice === 0) {
    openGameScene(difficulty);
  } else {
    openMenuScene();
  }
}
