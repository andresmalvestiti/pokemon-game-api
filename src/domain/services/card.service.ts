import { inject, injectable } from 'inversify';
import { CardRepository } from '../../adapters/repositories/card.repository';
import { CardDTO } from '../dto/card.dto';
import { Card } from '@prisma/client';

@injectable()
export class CardService {
  constructor(
    @inject('CardRepository') private cardRepository: CardRepository,
  ) {}

  create = async (card: CardDTO): Promise<Card> => {
    try {
      return this.cardRepository.create(card);
    } catch (error) {
      throw new Error('Error in card service');
    }
  };

  update = async (card: Partial<CardDTO>): Promise<Card> => {
    try {
      return this.cardRepository.update(card);
    } catch (error) {
      throw new Error('Error in card service');
    }
  };

  findById = async (id: number): Promise<Card | null> => {
    try {
      return this.cardRepository.findById(id);
    } catch (error) {
      throw new Error('Error in card service');
    }
  };

  findByName = async (name: string): Promise<Card | null> => {
    try {
      return this.cardRepository.findByName(name);
    } catch (error) {
      throw new Error('Error in card service');
    }
  };

  findAll = async (): Promise<Card[]> => {
    try {
      return this.cardRepository.findAll();
    } catch (error) {
      throw new Error('Error in card service');
    }
  };

  delete = async (id: number): Promise<Card> => {
    try {
      return await this.cardRepository.delete(id);
    } catch (error) {
      throw new Error('Error in card service');
    }
  };

  getWeaknessMultiplier = (attacker: Card, defender: Card): number => {
    const isDefenderWeak = defender.weaknessId === attacker.elementId;
    return isDefenderWeak ? defender.weaknessMultiplier : 1;
  };

  getResistanceValue = (attacker: Card, defender: Card): number => {
    const isDefenderResistant = defender.resistanceId === attacker.elementId;
    return isDefenderResistant && defender.resistanceValue
      ? defender.resistanceValue
      : 0;
  };

  calculateAttackValue = (
    originalAttack: number,
    multiplier: number,
    resistance: number,
  ): number => {
    // I supposed that resistance is already a negative number
    return originalAttack * multiplier + resistance;
  };
}
