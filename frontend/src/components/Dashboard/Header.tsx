import React from 'react';
import { Flex, Heading, Spacer, Button } from "@chakra-ui/react";
import { FaUser } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <Flex align="center" p={4} bg="white" boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1)">
      <Heading size="lg" color="brand.500">FlexiQR</Heading>
      <Spacer />
      <Button leftIcon={<FaUser />} colorScheme="brand" variant="ghost">
        Profile
      </Button>
    </Flex>
  );
};

export default Header;
