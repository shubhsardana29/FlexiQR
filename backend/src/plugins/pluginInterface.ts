export interface AnalyticsPlugin {
    name: string;
    processData: (scans: any[]) => Promise<any>;
  }