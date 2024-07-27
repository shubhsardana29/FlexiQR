import React from 'react';
import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import QRCodeGenerator from '../QRCodeGenerator/QRCodeGenerator';
import AnalyticsOverview from '../Analytics/AnalyticsOverview';

const MotionBox = motion(Box);

const Dashboard: React.FC = () => {
  const location = useLocation();

  return (
    <Flex h="100vh">
      <Sidebar />
      <Box flex={1} overflow="auto">
        <Header />
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          p={5}
        >
          <Routes location={location} key={location.pathname}>
            <Route index element={<QRCodeGenerator />} />
            <Route path="analytics" element={<AnalyticsOverview />} />
          </Routes>
        </MotionBox>
      </Box>
    </Flex>
  );
};

export default Dashboard;