export default class Player {
  hp = 100;

  constructor(name) {
    this.name = name;
  }

  takeDamage() {
    const rand = Math.floor(Math.random() * 12);
    this.hp = this.hp - rand;
  }

  getHp() {
    return this.hp;
  }
}
