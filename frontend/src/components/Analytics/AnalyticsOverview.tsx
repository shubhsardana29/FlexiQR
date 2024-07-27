import React from 'react';
import { Box, VStack, Heading, Text, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import { useAnalytics } from '../../hooks/useAnalytics';
import DailyScanChart from './DailyScanChart';
import GeographicDistribution from './GeographicDistribution';
import DeviceInsights from './DeviceInsights';
import DateRangeSelector from './DateRangeSelector';

const AnalyticsOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Initialize dateRange state with undefined values
  const [dateRange, setDateRange] = React.useState<{ startDate: Date | undefined; endDate: Date | undefined }>({ startDate: undefined, endDate: undefined });

  // Call useAnalytics unconditionally
  const { analyticsData, isLoading, error } = useAnalytics(id || '', dateRange.startDate || null, dateRange.endDate || null);

  // Check if id is undefined
  if (!id) {
    return <Text color="red.500">Error: ID is required</Text>;
  }

  // Handle loading state
  if (isLoading) return <Spinner size="xl" />;

  // Handle error state
  if (error && typeof error === 'object' && 'message' in error) {
    return <Text color="red.500">Error loading analytics: {error.message as string}</Text>;
  }

  // Handle analytics overview
  return (
    <Box>
      <Heading mb={5}>Analytics Overview</Heading>
      <DateRangeSelector onChange={(dates) => setDateRange(dates)} />
      <VStack spacing={8} align="stretch" mt={4}>
        <Text fontSize="2xl">Total Scans: {analyticsData.totalScans}</Text>
        <SimpleGrid columns={[1, null, 2]} spacing={8}>
          <DailyScanChart data={analyticsData.dailyScans} />
          <GeographicDistribution data={analyticsData.geographicData} />
          <DeviceInsights deviceTypes={analyticsData.deviceTypes} browsers={analyticsData.browsers} />
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default AnalyticsOverview;
