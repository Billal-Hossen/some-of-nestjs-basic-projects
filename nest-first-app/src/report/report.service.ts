import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { data, ReportType } from '../data';
import { ReportResponseDto } from '../dtos/report.dto';

interface Report {
  amount: number;
  source: string;
}
interface UpdateReport {
  amount?: number;
  source?: string;
}
@Injectable()
export class ReportService {
  // get all report
  getAllRecords(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((repo) => repo.type === type)
      .map((repo) => new ReportResponseDto(repo));
  }

  //  create report
  createReport(
    type: ReportType,
    { source, amount }: Report,
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);

    return new ReportResponseDto(newReport);
  }
  // get report by id
  getReportById(type: ReportType, id: string): ReportResponseDto {
    const info = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    if (!info) {
      return;
    }
    return new ReportResponseDto(info);
  }

  // update report
  updateReportById(
    type: ReportType,
    body: UpdateReport,
    id: string,
  ): ReportResponseDto {
    const info = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    if (!info) return;
    console.log({ body });
    const foundReportIndex = data.report.findIndex((repo) => repo.id === id);
    data.report[foundReportIndex] = {
      ...data.report[foundReportIndex],
      ...body,
      updated_at: new Date(),
    };

    return new ReportResponseDto(data.report[foundReportIndex]);
  }

  // delete report by id
  deleteReportById(id: string) {
    const reportIndex = data.report.findIndex((repo) => repo.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
    return;
  }
}
