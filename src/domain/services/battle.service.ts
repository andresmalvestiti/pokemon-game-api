import { inject, injectable } from 'inversify';
import { CardService } from './card.service';

@injectable()
export class BattleService {
  constructor(@inject('CardService') private cardService: CardService) {}

  isWinnable = async (
    attackerId: number,
    defenderId: number,
  ): Promise<boolean> => {
    if (attackerId === defenderId)
      throw new Error(`Can't battle againt same character!`);
    try {
      const attacker = await this.cardService.findById(attackerId);
      const defender = await this.cardService.findById(defenderId);
      if (!attacker || !defender) throw new Error(`Character doesn't exist!`);
      const multiplier = this.cardService.getWeaknessMultiplier(
        attacker,
        defender,
      );
      const resistance = this.cardService.getResistanceValue(
        attacker,
        defender,
      );
      const finalAttack = this.cardService.calculateAttackValue(
        attacker.attack,
        multiplier,
        resistance,
      );
      return defender.hp - finalAttack <= 0;
    } catch (error) {
      throw new Error('Error in battle service');
    }
  };
}
