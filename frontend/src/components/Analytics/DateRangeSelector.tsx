import React from 'react';
import { Box, Button } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Define the props type
interface DateRangeSelectorProps {
  onChange: (dates: { startDate: Date | undefined; endDate: Date | undefined }) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ onChange }) => {
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);

  const handleApply = () => {
    onChange({ startDate, endDate });
  };

  return (
    <Box>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date as Date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date as Date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
      <Button onClick={handleApply} colorScheme="brand" ml={2}>
        Apply
      </Button>
    </Box>
  );
};

export default DateRangeSelector;
