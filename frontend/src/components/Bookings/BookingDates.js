import React, {useState} from "react";
import Calendar from 'react-calendar';
import { useDispatch } from "react-redux";
import 'react-calendar/dist/Calendar.css';
import { useEffect } from "react";

function BookingDates({ onChange }) {
    const [dates, setDates] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);
  
    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    });
  
    const handleClickOutside = (event) => {
      if (showCalendar && !event.target.closest(".calendar-container")) {
        setShowCalendar(false);
      }
    };
  
    const handleCalendarChange = (newDates) => {
      setDates(newDates);
      onChange(newDates[0], newDates[1]);
    };
  
    return (
        <div className="Date-selector-container">
          DATES
          <button onClick={() => setShowCalendar(true)}>
            <i className="fa-solid fa-calendar"/>
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