import { Model } from 'sequelize';
import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { DateEntityType } from '../../types';

@Table({
  tableName: 'rating',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Rating extends Model<Rating> {
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id: number;

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
}
