import { IsOptional, IsString } from 'class-validator';

export class CreateTypeDTO {
  @IsOptional()
  @IsString()
  name: string;
}
