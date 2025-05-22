import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Type } from '../../database/entities/Type.entity';
import { CreateTypeDTO } from './types.dto';

@Injectable()
export class TypesService {
  constructor(
    @InjectModel(Type)
    private readonly typeRepository: typeof Type,
  ) {}

  async createType(data: CreateTypeDTO) {
    const { name } = data;
    const type = await this.typeRepository.create({ name });
    return type;
  }

  async getAll() {
    const types = await this.typeRepository.findAll();
    return types;
  }
}
