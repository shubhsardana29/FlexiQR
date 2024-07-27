import { useState } from 'react';
import { useMutation } from 'react-query';
import { generateQRCode as generateQRCodeAPI } from '../services/api';

export const useQRCode = () => {
  const [qrCodeData, setQRCodeData] = useState({
    text: '',
    shape: 'square',
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    eyeColor: '#000000',
    eyeStyle: 'square',
    pattern: 'squares',
    size: 256,
  });

  const [generatedQRCode, setGeneratedQRCode] = useState(null);

  const mutation = useMutation(generateQRCodeAPI, {
    onSuccess: (data) => {
      setGeneratedQRCode(data);
    },
  });

  const generateQRCode = () => {
    mutation.mutate(qrCodeData);
  };

  return {
    qrCodeData,
    setQRCodeData,
    generateQRCode,
    generatedQRCode,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};