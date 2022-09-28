import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { ReportType } from '../data';
import {
  createReportDto,
  ReportResponseDto,
  updateReportDto,
} from '../dtos/report.dto';
import { ReportService } from './report.service';
// http://localhost:3000/report/income or http://localhost:3000/report/expense
// here type define income or expense
@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  // get all income reports
  @Get()
  getAllRecords(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    const typeOfReport =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getAllRecords(typeOfReport);
  }

  // get all income reports
  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    const typeOfReport =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.getReportById(typeOfReport, id);
  }

  // post income report
  @HttpCode(200)
  @Post()
  createReport(
    @Body() { source, amount }: createReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto {
    // console.log({type,source,amount});
    const typeOfReport =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.createReport(typeOfReport, { source, amount });
  }

  // put income record by id
  @Put(':id')
  updateReportById(
    @Body() body: updateReportDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto {
    const typeOfReport =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.updateReportById(typeOfReport, body, id);
  }
  // delete income Record by id
  @Delete(':id')
  deletteRecordById(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReportById(id);
  }
}
