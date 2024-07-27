import { useQuery } from 'react-query';
import { getAnalytics } from '../services/api';

export const useAnalytics = (qrCodeId: string, startDate: Date | null, endDate: Date | null) => {
  const { data, isLoading, error } = useQuery(
    ['analytics', qrCodeId, startDate, endDate],
    () => getAnalytics(qrCodeId, startDate, endDate),
    {
      enabled: !!qrCodeId && !!startDate && !!endDate,
    }
  );

  return { analyticsData: data, isLoading, error };
};