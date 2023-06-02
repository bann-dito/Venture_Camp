import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function BookingGuest({ onChange, showGuests, setShowGuests }) {
    const [numGuests, setNumGuests] = useState(1);
    const guestsRef = useRef(null);
  
    const handleGuestChange = (newNumGuests) => {
      setNumGuests(newNumGuests);
      onChange(newNumGuests);
    };
  
  
    return (
      <div className="guest-selector-container" onClick={(e) => e.stopPropagation()}>
        
        <button className="guests-container" onClick={(e) => {
          setShowGuests(prev => !prev)
        }}>
          <FontAwesomeIcon icon={faUser}/>
          <label>Number of Guests:</label>
          <span>{numGuests}</span>
        </button>
        {showGuests && (
          <div className="guests-counter" ref={guestsRef}>
            <button onClick={() => handleGuestChange(numGuests - 1)}>-</button>
            <span>{numGuests}</span>
            <button onClick={() => handleGuestChange(numGuests + 1)}>+</button>
          </div>
        )}
      </div>
    );
  }
  
  export default BookingGuest;