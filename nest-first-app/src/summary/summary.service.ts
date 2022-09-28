import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}
  calculateSummary() {
    const totalIncome = this.reportService
      .getAllRecords(ReportType.INCOME)
      .reduce((sum, report) => sum + report.amount, 0);
    const totalExpense = this.reportService
      .getAllRecords(ReportType.EXPENSE)
      .reduce((sum, report) => sum + report.amount, 0);
    return {
      totalIncome,
      totalExpense,
      netIncome: totalIncome - totalExpense,
    };
  }
}
