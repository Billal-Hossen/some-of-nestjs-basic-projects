export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export const data: Data = {
  report: [
    {
      id: '2c235310-8aac-4616-a683-0de64051b636',
      source: 'FaceBook',
      amount: 500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: '1c72c26b-2855-468d-81c6-01d797b50e61',
      source: 'YouTube',
      amount: 1000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE,
    },
    {
      id: 'fbe61970-f947-4919-bffe-15c122023ad1',
      source: 'FaceBook',
      amount: 200,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE,
    },
    {
      id: 'facb68c0-c38b-4a9e-96ff-c03bcfb326c5',
      source: 'YouTube',
      amount: 5000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
  ],
};

interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
  }[];
}
