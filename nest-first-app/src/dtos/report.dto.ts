import { Exclude, Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ReportType } from 'src/data';

export class createReportDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  source: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
export class updateReportDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  source: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount: number;
}

export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  @Expose({ name: 'createdAt' })
  trransformCreatedAt() {
    return this.created_at;
  }
  type: ReportType;

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}
