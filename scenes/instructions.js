// ===== Color Thief — how to play =====
async function openInstructionsScene() {
  const scene = createBaseGame();

  await scene.openDialog('You are the <1>Color Thief<1>. The vault is packed with gems.');
  await scene.openDialog('Move your golden cursor with <3>WASD<3> or the <3>arrow keys<3>.');
  await scene.openDialog('Press <3>SPACE<3> on a gem to steal its whole cluster of touching same-colored gems.');
  await scene.openDialog('You can only take clusters of <1>two or more<1>.');
  await scene.openDialog('Bigger hauls pay off: a pair scores <1>20<1>... But ten-gem cluster scores <1>900<1>.');
  await scene.openDialog('Gems above stolen ones collapse down.');
  await scene.openDialog('Empty the entire vault for a <1>+1000<1> bonus.');
  await scene.openDialog('When no clusters remain, the heist ends.');
  await scene.openDialog('Steal big. <1>Good luck!<1>');

  openMenuScene();
}
