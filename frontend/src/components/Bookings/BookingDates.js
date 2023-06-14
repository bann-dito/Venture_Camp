import React, {useState} from "react";
import Calendar from 'react-calendar';
import { useDispatch } from "react-redux";
import 'react-calendar/dist/Calendar.css';
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

function BookingDates({ onChange, showCalendar, setShowCalendar }) {
    const [dates, setDates] = useState([]);
  
    const handleCalendarChange = (newDates) => {
      setDates(newDates);
      onChange(newDates[0].toLocaleDateString('en-GB'), newDates[1].toLocaleDateString('en-GB'));
    };
  
    return (
        <div className="Date-selector-container" onClick={(e) => e.stopPropagation()}>
          DATES
          <button onClick={(e) => {
            setShowCalendar(prev => !prev)
          }}>
            <FontAwesomeIcon icon={faCalendar}/>
            {dates[0] ? dates[0].toLocaleDateString() : "Check In"} -{" "}
            {dates[1] ? dates[1].toLocaleDateString() : "Check Out"}
          </button>
          {showCalendar && (
            <div className="calendar-container">
              <Calendar
                popperModifiers={{ flip: { behavior: ["bottom"] }, preventOverflow: { enabled: false }, hide: { enabled: false } }} 
                onChange={handleCalendarChange}
                selectRange={true}
                minDate={new Date()}
                next2Label={null}
                prev2Label={null}
                dropdownMode="select"
              />
            </div>
          )}
        </div>
    );
}

export default BookingDates;