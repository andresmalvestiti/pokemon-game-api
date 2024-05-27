import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { BattleService } from '../../domain/services/battle.service';

@injectable()
export class BattleController {
  constructor(@inject('BattleService') private battleServicb: BattleService) {}

  battle = async (request: Request, response: Response): Promise<Response> => {
    try {
      const attackerId = request.body.attackerId;
      const defenderId = request.body.defenderId;
      const card = await this.battleServicb.isWinnable(attackerId, defenderId);
      return response.status(200).json(card);
    } catch (error) {
      return response.status(500);
    }
  };
}
