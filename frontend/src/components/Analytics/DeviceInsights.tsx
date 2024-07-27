import React from 'react';
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DeviceInsights: React.FC<{ deviceTypes: Record<string, number>, browsers: Record<string, number> }> = ({ deviceTypes, browsers }) => {
  const deviceData = Object.entries(deviceTypes).map(([name, value]) => ({ name, value }));
  const browserData = Object.entries(browsers).map(([name, value]) => ({ name, value }));

const renderChart = (data: { name: string, value: number }[], title: string): JSX.Element => (
    <Box>
        <Heading size="md" mb={2}>{title}</Heading>
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    </Box>
);

  return (
    <SimpleGrid columns={[1, null, 2]} spacing={4}>
      {renderChart(deviceData, "Device Types")}
      {renderChart(browserData, "Browsers")}
    </SimpleGrid>
  );
};

export default DeviceInsights;