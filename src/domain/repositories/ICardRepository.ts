import { Card } from '@prisma/client';
import { CardDTO } from '../dto/card.dto';

export interface ICardRepository {
  create(card: CardDTO): Promise<Card>;
  update(card: Partial<CardDTO>): Promise<Card>;
  findById(id: number): Promise<Card | null>;
  findByName(name: string): Promise<Card | null>;
  findAll(id: number): Promise<Card[]>;
}
