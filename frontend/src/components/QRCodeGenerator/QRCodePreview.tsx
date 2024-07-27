import React from 'react';
import { Box, Image, Text, Button } from "@chakra-ui/react";
import { motion } from 'framer-motion';

type QRCodePreviewProps = {
  qrCode: {
    imageUrl: string;
  } | null;
};

const MotionBox = motion(Box);

const QRCodePreview: React.FC<QRCodePreviewProps> = ({ qrCode }) => {
  if (!qrCode) return null;

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      borderWidth={1}
      borderRadius="lg"
      p={4}
      textAlign="center"
    >
      <Image src={qrCode.imageUrl} alt="Generated QR Code" mx="auto" />
      <Text mt={2}>Scan me!</Text>
      <Button mt={4} colorScheme="brand" onClick={() => window.open(qrCode.imageUrl, '_blank')}>
        Download QR Code
      </Button>
    </MotionBox>
  );
};

export default QRCodePreview;
