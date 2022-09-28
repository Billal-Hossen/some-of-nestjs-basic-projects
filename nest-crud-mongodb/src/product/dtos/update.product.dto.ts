import { IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  newName: string;

  @IsOptional()
  newPrice: number;

  @IsOptional()
  @IsString()
  newDescription: string;
}
