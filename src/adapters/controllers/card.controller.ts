import { Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { CardService } from '../../domain/services/card.service';
import { CardDTO } from '../../domain/dto/card.dto';
import { Card } from '@prisma/client';

@injectable()
export class CardController {
  constructor(@inject('CardService') private cardService: CardService) {}

  createCard = async (
    request: Request,
    response: Response,
  ): Promise<Response<Card>> => {
    try {
      const payload = request.body as CardDTO;
      const card = await this.cardService.create(payload);
      return response.status(200).json(card);
    } catch (error) {
      return response.status(500);
    }
  };

  find = async (request: Request, response: Response): Promise<Response> => {
    const nameQueryParam = request.query.name;
    try {
      if (nameQueryParam) {
        const card = await this.cardService.findByName(
          nameQueryParam as string,
        );
        return response.status(200).json(card);
      }
      const cards = await this.cardService.findAll();
      return response.status(200).json(cards);
    } catch (error) {
      return response.status(500);
    }
  };

  findById = async (_: Request, response: Response): Promise<Response> => {
    try {
      const cards = await this.cardService.findAll();
      return response.status(200).json(cards);
    } catch (error) {
      return response.status(500);
    }
  };

  findByName = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    try {
      const name = request.body.name;

      if (!name)
        return response
          .status(400)
          .json({ message: "'name' field is required" });

      const card = await this.cardService.findByName(name);
      return response.status(200).json(card);
    } catch (error) {
      return response.status(500);
    }
  };

  updateCard = async (
    request: Request,
    response: Response,
  ): Promise<Response<Card>> => {
    const cardId = Number(request.params.id);
    const cardPayload = request.body as Partial<CardDTO>;
    if (!cardId)
      return response.status(400).json({
        message: "'id' param is required in order to update the Card.",
      });
    try {
      const payload = { id: cardId, ...cardPayload } as CardDTO;
      const card = await this.cardService.update(payload);
      return response.status(200).json(card);
    } catch (error) {
      return response.status(500);
    }
  };

  deleteCard = async (
    request: Request,
    response: Response,
  ): Promise<Response<Card>> => {
    const cardId = Number(request.params.id);
    if (!cardId)
      return response.status(400).json({
        message: "'id' param is required in order to delete the Card.",
      });
    try {
      const card = await this.cardService.delete(cardId);
      return response.status(200).json(card);
    } catch (error) {
      return response.status(500);
    }
  };
}
