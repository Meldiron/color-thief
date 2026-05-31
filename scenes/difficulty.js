// ===== Color Thief — difficulty select =====
async function openDifficultyScene() {
  const scene = createBaseGame();

  const choice = await scene.prompt(
    'Easy',
    'Medium',
    'Hard',
    'Go back',
  );

  switch (choice) {
    case 0:
      openGameScene('easy');
      break;
    case 1:
      openGameScene('medium');
      break;
    case 2:
      openGameScene('hard');
      break;
    case 3:
      openMenuScene();
      break;
  }
}
