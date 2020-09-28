import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './style.scss';

function Calendar({ onChange, dateFunction }) {
  const [date, setData] = useState(new Date());

  useEffect(_ => {
    function handleChange() {
      onChange(dateFunction(date))
    };
    handleChange();
  }, [date, onChange, dateFunction])

  return (
    (
      <DatePicker
        selected={date}
        onChange={date => setData(date)}
        minDate={new Date()}
        maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
        dateCaption="data"
        dateFormat="dd/MM/yy"
      />
    )
  );
}

export default Calendar;