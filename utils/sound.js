// ===== Color Thief — sound, gated by the settings toggle =====
// Sounds use the engine's built-in pfxr templates (PICKUP, HIT, POWERUP, ...).
// `play` is a no-op when the player has muted the game, so callers don't need
// to check the setting themselves.
const Sound = {
  isOn() {
    return Store.str('sound', 'on') === 'on';
  },
  setOn(on) {
    Store.setStr('sound', on ? 'on' : 'off');
  },
  play(scene, ...args) {
    if (this.isOn() && scene && scene.playSound) {
      scene.playSound(...args);
    }
  },
};
