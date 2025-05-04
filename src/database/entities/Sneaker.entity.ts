import { Model } from 'sequelize';
import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { DateEntityType } from '../../types';

@Table({
  tableName: 'sneakers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Sneaker extends Model<Sneaker> {
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: true,
  })
  price: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  img: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  type_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  brand_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  rating: number;

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
