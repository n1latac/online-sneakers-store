import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSneakerDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  price: string;

  @IsOptional()
  @IsString()
  img: string;

  @IsOptional()
  @IsString()
  type_id: number;

  @IsOptional()
  @IsString()
  brand_id: number;

  @IsOptional()
  @IsString()
  info: string;
}

export class GetAllSneakersDTO {
  @IsOptional()
  @IsNumber()
  type_id: number;

  @IsOptional()
  @IsNumber()
  brand_id: number;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsNumber()
  page: number;
}
