import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { DateEntityType } from '../../types';
import { User } from './User.entity';
import { Sneaker } from './Sneaker.entity';
import { BasketSneaker } from './BasketSneaker.entity';

@Table({
  tableName: 'baskets',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Basket extends Model<Basket> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id: number;

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

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Sneaker, () => BasketSneaker)
  sneakers: Sneaker[];
}
