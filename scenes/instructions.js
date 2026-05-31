async function openInstructionsScene() {
  const scene = createBaseGame();

  await scene.openDialog('You are the <9>Color Thief<9>. The vault is packed with gems.');
  await scene.openDialog('Move your golden cursor with <3>WASD<3> or the <3>arrow keys<3>.');
  await scene.openDialog('Press <3>SPACE<3> on a gem to steal its whole cluster of touching same-colored gems.');
  await scene.openDialog('You can only take clusters of <3>two or more<3>.');
  await scene.openDialog('Bigger loot pays off: a pair scores <3>20<3>.');
  await scene.openDialog('But ten-gem cluster scores <3>900<3>.');
  await scene.openDialog('Gems above stolen ones collapse down.');
  await scene.openDialog('Empty the entire vault for a <3>+1000<3> bonus.');
  await scene.openDialog('When no clusters remain, the heist ends.');
  await scene.openDialog('Steal big. <3>Good luck!<3>');

  openMenuScene();
}
