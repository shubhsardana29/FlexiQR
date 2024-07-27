import express from 'express';
import { getAnalytics } from '../services/analyticsService';

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
      const { startDate, endDate } = req.query;
      
      // Validate and parse date strings
    const parsedStartDate = new Date(startDate as string);
    const parsedEndDate = new Date(endDate as string);

    // Check if dates are valid
    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
        return res.status(400).json({ success: false, message: 'Invalid date format. Please use YYYY-MM-DD.' });
      }
  
      // Ensure startDate is not after endDate
      if (parsedStartDate > parsedEndDate) {
        return res.status(400).json({ success: false, message: 'Start date must be before or equal to end date.' });
      }
      const analytics = await getAnalytics(id, parsedStartDate, parsedEndDate);
    res.json({ success: true, ...analytics });
  } catch (error) {
    console.error('Error in analytics route:', error);
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'An unexpected error occurred' });
    }
  }
});

export default router;