import React from 'react';
import { VStack, Icon, Tooltip, Box } from "@chakra-ui/react";
import { Link, useLocation } from 'react-router-dom';
import { FaQrcode, FaChartBar } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const NavItem = ({ icon, path, label }: { icon: React.ElementType, path: string, label: string }) => (
    <Tooltip label={label} placement="right">
      <Box as={Link} to={path} w="100%">
        <Box
          p={3}
          borderRadius="md"
          bg={location.pathname === path ? 'brand.500' : 'transparent'}
          color={location.pathname === path ? 'white' : 'gray.600'}
          _hover={{ bg: 'brand.100' }}
          transition="all 0.3s"
        >
          <Icon as={icon} w={6} h={6} />
        </Box>
      </Box>
    </Tooltip>
  );

  return (
    <VStack
      as="nav"
      spacing={5}
      align="center"
      p={4}
      bg="white"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
    >
      <NavItem icon={FaQrcode} path="/" label="QR Code Generator" />
      <NavItem icon={FaChartBar} path="/analytics" label="Analytics" />
    </VStack>
  );
};

export default Sidebar;