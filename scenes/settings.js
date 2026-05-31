async function openSettingsScene() {
  const scene = createBaseGame();
  const soundOn = Sound.isOn();

  const choice = await scene.prompt(
    soundOn ? 'Sound: ON' : 'Sound: OFF',
    'Go back',
  );

  switch (choice) {
    case 0:
      Sound.setOn(!soundOn);
      Sound.play(scene, 'BLIP');
      await scene.openDialog(
        soundOn ? 'Sound effects are now <5>off<5>.' : 'Sound effects are now <3>on<3>.',
      );
      openSettingsScene();
      break;
    case 1:
      openMenuScene();
      break;
  }
}
