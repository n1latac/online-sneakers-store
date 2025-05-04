import { Model } from 'sequelize';
import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { DateEntityType } from '../../types';

@Table({
  tableName: 'basket_sneakers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class BasketSneaker extends Model<BasketSneaker> {
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  sneaker_id: number;

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
}
