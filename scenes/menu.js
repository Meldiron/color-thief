// ===== Color Thief — main menu =====
async function openMenuScene() {
  const scene = createBaseGame();

  const choice = await scene.prompt('Play', 'How to play', 'Statistics', 'Settings');

  switch (choice) {
    case 0:
      openDifficultyScene();
      break;
    case 1:
      openInstructionsScene();
      break;
    case 2:
      openStatsScene();
      break;
    case 3:
      openSettingsScene();
      break;
  }
}
