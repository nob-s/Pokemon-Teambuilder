export class Ability {
  private static readonly ERROR_EFFECT: string = "Could not fetch effect"

  name: string;
  isHidden: boolean;
  effect: string;
  shortEffect: string;

  constructor(name: string, isHidden: boolean, shortEffect: string, effect: string) {
    this.name = name;
    this.isHidden = isHidden;
    this.shortEffect = shortEffect;
    this.effect = effect;
  }

  static getErrorAbility(name: string, isHidden: boolean): Ability {
    return this.constructor(name, isHidden, this.ERROR_EFFECT, this.ERROR_EFFECT);
  }


}