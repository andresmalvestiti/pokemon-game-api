import { Container } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { ICardRepository } from '../../../domain/repositories/ICardRepository';
import { CardRepository } from '../../repositories/card.repository';
import { CardService } from '../../../domain/services/card.service';
import { CardController } from '../../controllers/card.controller';

const container = new Container();

/* Controllers bindings */
container.bind<CardController>('CardController').to(CardController);

/* Services bindings */
container.bind<CardService>('CardService').to(CardService);

/* Repositories bindings */
container.bind<ICardRepository>('CardRepository').to(CardRepository);

/* DB Connection */
container
  .bind<PrismaClient>('PrismaClient')
  .toConstantValue(new PrismaClient());

export default container;
