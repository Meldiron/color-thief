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
