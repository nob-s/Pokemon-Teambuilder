export class Ability {
  private static readonly ERROR_EFFECT: string = "Could not fetch effect"

  name: string;
  isHidden: boolean;
  effect: string;
  shortEffect: string;

  constructor(name: string, isHidden: boolean, effect: string, shortEffect: string) {
    this.name = name;
    this.isHidden = isHidden;
    this.effect = effect;
    this.shortEffect = shortEffect;
  }

  static getErrorAbility(name: string, isHidden: boolean): Ability {
    return this.constructor(name, isHidden, this.ERROR_EFFECT, this.ERROR_EFFECT);
  }


}