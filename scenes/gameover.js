async function openGameOverScene({ won, score, stolen, difficulty, newRecord }) {
  const scene = createBaseGame();
  const recordLine = newRecord ? '<1>NEW BEST!<1>\n\n' : '';

  if (won) {
    await scene.openMessage(
      `<3>VAULT CLEARED!<3>\n\n` +
        `A flawless heist. You emptied the entire vault.\n\n` +
        `Score: <3>${score}<3>\nGems stolen: <3>${stolen}<3>\n\n` +
        `${recordLine}<2>press SPACE to continue<2>`,
    );
  } else {
    await scene.openMessage(
      `<9>NO MOVES LEFT<9>\n\n` +
        `The vault is picked clean of easy pickings.\n\n` +
        `Score: <3>${score}<3>\nGems stolen: <3>${stolen}<3>\n\n` +
        `${recordLine}<2>press SPACE to continue<2>`,
    );
  }

  const choice = await scene.prompt('Play again', 'Main menu');
  if (choice === 0) {
    openGameScene(difficulty);
  } else {
    openMenuScene();
  }
}
