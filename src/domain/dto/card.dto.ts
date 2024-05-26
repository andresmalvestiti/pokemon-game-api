import { ElementDTO } from './element.dto.ts';

export interface CardDTO {
  id: number;
  name: string;
  element?: ElementDTO;
  hp: number;
  attack: number;
  weakness?: ElementDTO;
  weaknessMultiplier: number;
  resistance?: ElementDTO;
  resistanceValue: number;
}
