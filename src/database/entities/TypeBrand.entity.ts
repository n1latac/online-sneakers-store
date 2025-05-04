import { Model } from 'sequelize';
import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { DateEntityType } from '../../types';

@Table({
  tableName: 'types_brands',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class TypeBrand extends Model<TypeBrand> {
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  brand_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  type_id: number;

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
