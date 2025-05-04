import { Column, DataType, Table, Model, HasMany } from 'sequelize-typescript';
import { DateEntityType } from '../../types';
import { Rating } from './Rating.entity';

@Table({
  tableName: 'users',
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  role: string;

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
}
