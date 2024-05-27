import { Container } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { ICardRepository } from '../../../domain/repositories/ICardRepository';
import { CardRepository } from '../../repositories/card.repository';
import { CardService } from '../../../domain/services/card.service';
import { CardController } from '../../controllers/card.controller';
import { BattleController } from '../../controllers/battle.controller';
import { BattleService } from '../../../domain/services/battle.service';

const container = new Container();

/* Controllers bindings */
container.bind<CardController>('CardController').to(CardController);
container.bind<BattleController>('BattleController').to(BattleController);

/* Services bindings */
container.bind<CardService>('CardService').to(CardService);
container.bind<BattleService>('BattleService').to(BattleService);

/* Repositories bindings */
container.bind<ICardRepository>('CardRepository').to(CardRepository);

/* DB Connection */
container
  .bind<PrismaClient>('PrismaClient')
  .toConstantValue(new PrismaClient());

export default container;
