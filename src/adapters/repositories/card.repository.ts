import { Card, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ICardRepository } from '../../domain/repositories/ICardRepository';
import { CardDTO } from '../../domain/dto/card.dto';

@injectable()
export class CardRepository implements ICardRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  create = async (card: CardDTO): Promise<Card> => {
    const { resistance, weakness, element, id, ...commonValues } = card;
    try {
      return await this.prisma.card.create({
        data: {
          ...commonValues,
          element: {
            connect: {
              id: element?.id,
            },
          },
          weakness: {
            connect: { id: weakness?.id },
          },
          resistance: {
            connect: { id: resistance?.id },
          },
        },
        include: {
          element: true,
          resistance: true,
          weakness: true,
        },
      });
    } catch (error) {
      throw new Error('Error in card repository');
    }
  };

  update = async (card: Partial<CardDTO>): Promise<Card> => {
    const { resistance, weakness, element, id, ...commonValues } = card;
    try {
      return await this.prisma.card.update({
        data: {
          ...commonValues,
          elementId: element?.id,
          weaknessId: weakness?.id,
          resistanceId: resistance?.id || null,
        },
        include: {
          element: true,
          resistance: true,
          weakness: true,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error('Error in card repository');
    }
  };

  findById = async (id: number): Promise<Card | null> => {
    try {
      return await this.prisma.card.findUnique({
        where: { id },
        include: { element: true, resistance: true, weakness: true },
      });
    } catch (error) {
      throw new Error('Error in card repository');
    }
  };

  findByName = async (name: string): Promise<Card | null> => {
    try {
      return await this.prisma.card.findFirst({
        where: { name },
        include: { element: true, resistance: true, weakness: true },
      });
    } catch (error) {
      throw new Error('Error in card repository');
    }
  };

  findAll = async (): Promise<Card[]> => {
    try {
      return await this.prisma.card.findMany({
        include: { element: true, resistance: true, weakness: true },
      });
    } catch (error) {
      throw new Error('Error in card repository');
    }
  };

  delete = async (id: number): Promise<Card> => {
    try {
      return await this.prisma.card.delete({ where: { id } });
    } catch (error) {
      throw new Error('Error in card repository');
    }
  };
}
