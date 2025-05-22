import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TypesService } from './types.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { RolesEnum } from '../../enum';
import { CreateTypeDTO } from './types.dto';
import { SuccessResponseDTO } from '../../responses/successResponse';

@Controller('types')
export class TypesController {
  constructor(private readonly typeService: TypesService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.ADMIN)
  @Post('create')
  async createType(@Body() data: CreateTypeDTO): Promise<SuccessResponseDTO> {
    const result = await this.typeService.createType(data);
    return new SuccessResponseDTO(result);
  }

  @Get('all')
  async getAllTypes(): Promise<SuccessResponseDTO> {
    console.log('here');
    const result = await this.typeService.getAll();
    return new SuccessResponseDTO(result);
  }
}
