export default class Player {
  constructor(name) {
    this.name = name;
  }

  takeDamage() {
    const randomDamage = Math.floor(Math.random() * 24);
    return randomDamage
  }
}
