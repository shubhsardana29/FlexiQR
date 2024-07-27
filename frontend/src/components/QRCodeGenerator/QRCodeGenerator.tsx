import React, { useEffect } from 'react';
import { Box, VStack, Heading, useToast } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import QRCodeForm from './QRCodeForm';
import QRCodePreview from './QRCodePreview';
import { useQRCode } from '../../hooks/useQRCode';

const MotionVStack = motion(VStack);

const QRCodeGenerator: React.FC = () => {
  const toast = useToast();
  const { qrCodeData, setQRCodeData, generateQRCode, generatedQRCode, isLoading, error } = useQRCode();
  type ErrorType = { message: string };
  
  useEffect(() => {
    if (error) {
      const errorObj = error as ErrorType; 
      toast({
        title: "Error",
        description: errorObj.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  return (
    <Box>
      <Heading mb={5}>QR Code Generator</Heading>
      <MotionVStack
        spacing={8}
        align="stretch"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <QRCodeForm
          qrCodeData={qrCodeData}
          setQRCodeData={setQRCodeData}
          onGenerate={generateQRCode}
          isLoading={isLoading}
        />
        <QRCodePreview qrCode={generatedQRCode} />
      </MotionVStack>
    </Box>
  );
};

export default QRCodeGenerator;
