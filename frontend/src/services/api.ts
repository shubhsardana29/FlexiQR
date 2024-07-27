import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const generateQRCode = async (qrCodeData: unknown) => {
  const response = await axios.post(`${API_BASE_URL}/qr`, qrCodeData);
  return response.data;
};

export const getAnalytics = async (qrCodeId: string, startDate: Date | null, endDate: Date | null) => {
  const response = await axios.get(`${API_BASE_URL}/analytics/${qrCodeId}`, {
    params: {
      startDate: startDate?.toISOString().split('T')[0],
      endDate: endDate?.toISOString().split('T')[0],
    },
  });
  return response.data;
};
