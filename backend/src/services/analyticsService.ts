import { Scan } from '../models/Scan';
import plugins from '../plugins';

export async function getAnalytics(qrCodeId: string, startDate: Date, endDate: Date) {
  const scans = await Scan.find({
    qrCodeId,
    timestamp: {
        $gte: startDate,
        $lte: endDate,
    },
  });

  const dailyScans = scans.reduce((acc, scan) => {
    const date = scan.timestamp.toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const geographicData = scans.reduce((acc, scan) => {
    if (!acc[scan.country]) {
      acc[scan.country] = { total: 0, regions: {} };
    }
    acc[scan.country].total++;
    
    if (!acc[scan.country].regions[scan.region]) {
      acc[scan.country].regions[scan.region] = { total: 0, cities: {} };
    }
    acc[scan.country].regions[scan.region].total++;
    
    if (!acc[scan.country].regions[scan.region].cities[scan.city]) {
      acc[scan.country].regions[scan.region].cities[scan.city] = 0;
    }
    acc[scan.country].regions[scan.region].cities[scan.city]++;
    
    return acc;
  }, {} as Record<string, { 
    total: number; 
    regions: Record<string, { 
      total: number; 
      cities: Record<string, number> 
    }> 
  }>);

  const deviceTypes = scans.reduce((acc, scan) => {
    acc[scan.deviceType] = (acc[scan.deviceType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const browsers = scans.reduce((acc, scan) => {
    acc[scan.browser] = (acc[scan.browser] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pluginResults = await Promise.all(
    Object.values(plugins).map(plugin => plugin.processData(scans))
  );

  return {
    totalScans: scans.length,
    dailyScans,
    geographicData,
    deviceTypes,
    browsers,
    pluginInsights: pluginResults.reduce((acc, result) => ({ ...acc, ...result }), {}),
  };
}