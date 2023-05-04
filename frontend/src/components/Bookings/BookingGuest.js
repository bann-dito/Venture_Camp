import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function BookingGuest({ onChange }) {
    const [numGuests, setNumGuests] = useState(1);
    const [showGuests, setShowGuests] = useState(false);
    const guestsRef = useRef(null);
  
    const handleGuestChange = (newNumGuests) => {
      setNumGuests(newNumGuests);
      onChange(newNumGuests);
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (guestsRef.current && !guestsRef.current.contains(event.target)) {
          setShowGuests(false);
        }
      };
      if (showGuests) {
        window.addEventListener("click", handleClickOutside);
      }
      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }, [showGuests]);
  
    return (
      <>
        
        <button className="guests-container" onClick={() => setShowGuests(true)}>
          <i className="fa-solid fa-user"></i>
          <label>Number of Guests:</label>
          <span>{numGuests}</span>
          {/* {showGuests && (
          <div className="guests-counter" ref={guestsRef}>
            <button onClick={() => handleGuestChange(numGuests - 1)}>-</button>
            <span>{numGuests}</span>
            <button onClick={() => handleGuestChange(numGuests + 1)}>+</button>
          </div>
        )} */}
        </button>
        {showGuests && (
          <div className="guests-counter" ref={guestsRef}>
            <button onClick={() => handleGuestChange(numGuests - 1)}>-</button>
            <span>{numGuests}</span>
            <button onClick={() => handleGuestChange(numGuests + 1)}>+</button>
          </div>
        )}
      </>
    );
  }
  
  export default BookingGuest;