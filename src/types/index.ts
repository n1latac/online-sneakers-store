import { Literal } from 'sequelize/types/utils';

export type DateEntityType =
  | undefined
  | null
  | Date
  | string
  | number
  | Literal;
