import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Define the type for the data prop
interface DailyScanChartProps {
  data: { [date: string]: number };
}

const DailyScanChart: React.FC<DailyScanChartProps> = ({ data }) => {
  // Transform the data into the format expected by recharts
  const chartData = Object.entries(data).map(([date, scans]) => ({ date, scans }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="scans" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DailyScanChart;
