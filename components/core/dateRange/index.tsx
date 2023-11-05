import React from "react";
import { DateRangePicker } from "react-date-range";

const DateRange = ({ stateOfDate, setStateOfDate }) => {
  return (
    <DateRangePicker
      onChange={(item) => setStateOfDate([item.selection])}
      //   showSelectionPreview={true}
      //   moveRangeOnFirstSelection={false}
      // months={2}
      ranges={stateOfDate}
      direction='horizontal'
    />
  );
};

export default DateRange;
