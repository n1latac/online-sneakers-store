import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Table,
  Model,
} from 'sequelize-typescript';
import { DateEntityType } from '../../types';
import { Sneaker } from './Sneaker.entity';

@Table({
  tableName: 'types',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Type extends Model<Type> {
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  created_at: DateEntityType;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at: DateEntityType;

  @HasMany(() => Sneaker)
  sneakers: Sneaker[];
}
