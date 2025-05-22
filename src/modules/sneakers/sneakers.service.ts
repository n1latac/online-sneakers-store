import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sneaker } from '../../database/entities/Sneaker.entity';
import { CreateSneakerDto } from './sneakers.dto';
import { SneakersInfo } from '../../database/entities/SneakersInfo.entity';

@Injectable()
export class SneakersService {
  constructor(
    @InjectModel(Sneaker)
    private readonly sneakersRepo: typeof Sneaker,
    @InjectModel(SneakersInfo)
    private readonly sneakersInfoRepo: typeof SneakersInfo,
  ) {}
  async createSneaker(data: CreateSneakerDto, file) {
    const {
      name,
      price: priceString,
      brand_id: brandIdString,
      type_id: typeIdString,
      info,
    } = data;
    const price = Number(priceString);
    const brand_id = Number(brandIdString);
    const type_id = Number(typeIdString);
    try {
      const sneaker = await Sneaker.create({
        name,
        price,
        brand_id,
        type_id,
        img: file.filename,
      });

      if (info) {
        const ArrayInfo = JSON.parse(info);
        console.log(ArrayInfo);
        for (const item of ArrayInfo) {
          await SneakersInfo.create({
            title: item.title,
            description: item.description,
            sneaker_id: sneaker.id,
          });
        }
      }
      return sneaker;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(data) {
    const {
      brand_id: brand_id_string,
      type_id: type_id_string,
      limit = 10,
      page = 1,
    } = data;
    const brand_id = Number(brand_id_string);
    const type_id = Number(type_id_string);
    const offset = (page - 1) * limit;
    let sneakers;
    if (!brand_id && !type_id) {
      sneakers = await this.sneakersRepo.findAndCountAll({
        limit,
        offset,
        include: [
          {
            association: 'type',
          },
          {
            association: 'brand',
          },
        ],
      });
    }
    if (brand_id && !type_id) {
      console.log('here');
      console.log(limit);
      console.log(offset);
      sneakers = await this.sneakersRepo.findAndCountAll({
        where: { brand_id },
        limit,
        offset,
      });
    }
    if (!brand_id && type_id) {
      sneakers = await this.sneakersRepo.findAndCountAll({
        where: { type_id },
        limit,
        offset,
      });
    }
    if (brand_id && type_id) {
      sneakers = await this.sneakersRepo.findAndCountAll({
        where: { type_id, brand_id },
        limit,
        offset,
      });
    }
    return { sneakers: sneakers.rows, count: sneakers.count };
  }

  async getOneSneakerById(id: number) {
    if (id === undefined) {
      throw new BadRequestException('Bad request data.');
    }
    const sneaker = await Sneaker.findOne({
      where: { id },
      include: [{ association: 'device_info' }],
    });
    return sneaker;
  }
}
