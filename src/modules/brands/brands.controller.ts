import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { RolesEnum } from '../../enum';
import { SuccessResponseDTO } from '../../responses/successResponse';
import { CreateTypeDTO } from '../types/types.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.ADMIN)
  @Post('create')
  async createType(@Body() data: CreateTypeDTO): Promise<SuccessResponseDTO> {
    const result = await this.brandsService.createBrand(data);
    return new SuccessResponseDTO(result);
  }

  @Get('all')
  async getAllTypes(): Promise<SuccessResponseDTO> {
    const result = await this.brandsService.getAll();
    return new SuccessResponseDTO(result);
  }
}
