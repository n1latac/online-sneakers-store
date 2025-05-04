import {
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  HasMany,
} from 'sequelize-typescript';
import { DateEntityType } from '../../types';
import { Sneaker } from './Sneaker.entity';

@Table({
  tableName: 'brands',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Brand extends Model<Brand> {
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
