import { AnalyticsPlugin } from '../pluginInterface';

interface IScan {
  deviceType: string;
  browser: string;
  timestamp: Date;
  userAgent: string;
}

interface DeviceBrowserCombo {
  deviceType: string;
  browser: string;
  count: number;
}

const deviceAnalytics: AnalyticsPlugin = {
  name: 'deviceAnalytics',
  processData: async (scans: IScan[]) => {
    // Basic device type and browser counts
    const deviceTypes = scans.reduce((acc, scan) => {
      acc[scan.deviceType] = (acc[scan.deviceType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const browsers = scans.reduce((acc, scan) => {
      acc[scan.browser] = (acc[scan.browser] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Device-Browser combinations
    const deviceBrowserCombos = scans.reduce((acc, scan) => {
      const key = `${scan.deviceType}|${scan.browser}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Top 10 device-browser combinations
    const topCombos: DeviceBrowserCombo[] = Object.entries(deviceBrowserCombos)
      .map(([key, count]) => {
        const [deviceType, browser] = key.split('|');
        return { deviceType, browser, count };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Monthly trends for device types
    const monthlyDeviceTrends = scans.reduce((acc, scan) => {
      const monthYear = scan.timestamp.toISOString().slice(0, 7); // YYYY-MM format
      if (!acc[monthYear]) {
        acc[monthYear] = {};
      }
      acc[monthYear][scan.deviceType] = (acc[monthYear][scan.deviceType] || 0) + 1;
      return acc;
    }, {} as Record<string, Record<string, number>>);

    // Extract OS information (basic implementation, can be improved)
    const operatingSystems = scans.reduce((acc, scan) => {
      let os = 'Unknown';
      if (scan.userAgent.includes('Win')) os = 'Windows';
      else if (scan.userAgent.includes('Mac')) os = 'MacOS';
      else if (scan.userAgent.includes('Linux')) os = 'Linux';
      else if (scan.userAgent.includes('Android')) os = 'Android';
      else if (scan.userAgent.includes('iOS')) os = 'iOS';
      
      acc[os] = (acc[os] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      deviceInsights: {
        deviceTypes,
        browsers,
        topDeviceBrowserCombos: topCombos,
        monthlyDeviceTrends,
        operatingSystems
      }
    };
  }
};

export default deviceAnalytics;