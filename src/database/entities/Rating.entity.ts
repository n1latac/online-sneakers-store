import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { DateEntityType } from '../../types';
import { User } from './User.entity';
import { Sneaker } from './Sneaker.entity';

@Table({
  tableName: 'rating',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Rating extends Model<Rating> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id: number;

  @ForeignKey(() => Sneaker)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  sneaker_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  rate: number;

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

  @BelongsTo(() => Sneaker)
  sneaker: Sneaker;
}
