import { Router } from 'express';
import { CardController } from '../adapters/controllers/card.controller';
import container from '../adapters/infraestructure/configs/inversify.config';

const router = Router();

const cardController = container.get<CardController>('CardController');

router.get('/', cardController.find);
router.post('/', cardController.createCard);
router.put('/:id', cardController.updateCard);
router.delete('/:id', cardController.deleteCard);

export default router;
