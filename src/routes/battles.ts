import { Router } from 'express';
import container from '../adapters/infraestructure/configs/inversify.config';
import { BattleController } from '../adapters/controllers/battle.controller';

export const router = Router();

const battleController = container.get<BattleController>('BattleController');

router.post('/', battleController.battle);
