import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { DateEntityType } from '../../types';
import { Sneaker } from './Sneaker.entity';
import { Basket } from './Basket.entity';

@Table({
  tableName: 'basket_sneakers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class BasketSneaker extends Model<BasketSneaker> {
  @ForeignKey(() => Sneaker)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  sneaker_id: number;

  @ForeignKey(() => Basket)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  basket_id: number;

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

  @BelongsTo(() => Sneaker)
  sneaker: Sneaker;

  @BelongsTo(() => Basket)
  basket: Basket;
}
