import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from '../../database/entities/Brand.entity';
import { CreateTypeDTO } from '../types/types.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand)
    private readonly brandRepository: typeof Brand,
  ) {}

  async createBrand(data: CreateTypeDTO) {
    const { name } = data;
    const brand = await this.brandRepository.create({ name });
    return brand;
  }

  async getAll() {
    const brands = await this.brandRepository.findAll();
    return brands;
  }
}
