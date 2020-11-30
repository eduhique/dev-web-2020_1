import React, { useState, useEffect, useRef } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
import "react-datepicker/dist/react-datepicker.css";
import './style.scss';
registerLocale('pt-BR', ptBR);

function Calendar({ onChange, dateFunction, dateProps }) {

  const [date, setData] = useState(dateProps ? new Date(dateProps.split("-")[0], dateProps.split("-")[1] - 1, dateProps.split("-")[2]) : new Date());
  const [dateBase] = useState(dateProps ? new Date(dateProps.split("-")[0], dateProps.split("-")[1] - 1, dateProps.split("-")[2]) : new Date());
  const ref = useRef();

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button ref={ref} className="custom-input" onClick={onClick}>
      {value}
    </button>
  ));

  useEffect(_ => {
    function handleChange() {
      onChange(dateFunction(date))
    };
    handleChange();
  }, [date, onChange, dateFunction])

  return (
    (
      <DatePicker
        className="date-calendar"
        closeOnScroll={true}
        dateCaption="data"
        dateFormat="dd/MM/yyyy"
        customInput={<CustomInput ref={ref} />}
        selected={date}
        onChange={date => setData(date)}
        minDate={dateBase}
        locale="pt-BR"
      />
    )
  );
}

export default Calendar;