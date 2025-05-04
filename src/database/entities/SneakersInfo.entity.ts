import { Model } from 'sequelize';
import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { DateEntityType } from '../../types';

@Table({
  tableName: 'sneakers_info',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class SneakersInfo extends Model<SneakersInfo> {
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  sneaker_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

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
