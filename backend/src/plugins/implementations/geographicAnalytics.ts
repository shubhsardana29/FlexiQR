import { AnalyticsPlugin } from '../pluginInterface';

interface IScan {
  country: string;
  city: string;
  timestamp: Date;
}

interface CityData {
  city: string;
  country: string;
  count: number;
}

const geographicAnalytics: AnalyticsPlugin = {
  name: 'geographicAnalytics',
  processData: async (scans: IScan[]) => {
    // Overall country statistics
    const countryStats = scans.reduce((acc, scan) => {
      if (!acc[scan.country]) {
        acc[scan.country] = { total: 0, cities: {} };
      }
      acc[scan.country].total++;
      acc[scan.country].cities[scan.city] = (acc[scan.country].cities[scan.city] || 0) + 1;
      return acc;
    }, {} as Record<string, { total: number; cities: Record<string, number> }>);

    // Top 10 cities overall
    const allCities: CityData[] = Object.entries(countryStats).flatMap(([country, data]) =>
      Object.entries(data.cities).map(([city, count]) => ({ city, country, count }))
    );
    const topCities = allCities.sort((a, b) => b.count - a.count).slice(0, 10);

    // Geographic trends over time (monthly)
    const monthlyTrends = scans.reduce((acc, scan) => {
      const monthYear = scan.timestamp.toISOString().slice(0, 7); // YYYY-MM format
      if (!acc[monthYear]) {
        acc[monthYear] = {};
      }
      acc[monthYear][scan.country] = (acc[monthYear][scan.country] || 0) + 1;
      return acc;
    }, {} as Record<string, Record<string, number>>);

    return {
      geographicInsights: {
        countryStats,
        topCities,
        monthlyTrends
      }
    };
  }
};

export default geographicAnalytics;