import {
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  HasMany,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { DateEntityType } from '../../types';
import { Rating } from './Rating.entity';
import { Type } from './Type.entity';
import { Brand } from './Brand.entity';
import { SneakersInfo } from './SneakersInfo.entity';

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
  price: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  img: string;

  @ForeignKey(() => Type)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  type_id: number;

  @ForeignKey(() => Brand)
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

  @HasMany(() => Rating)
  ratings: Rating[];

  @BelongsTo(() => Type)
  type: Type;

  @BelongsTo(() => Brand)
  brand: Brand;

  @HasOne(() => SneakersInfo)
  sneakersInfo: SneakersInfo;
}
