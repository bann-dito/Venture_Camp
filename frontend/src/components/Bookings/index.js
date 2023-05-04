import { useDispatch } from "react-redux";
import { createNewBooking } from "../../store/bookings";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Modal } from "../../context/Modal";
import LoginForm from "../SessionForms/LoginForm";
import BookingDates from "./BookingDates";
import BookingGuest from "./BookingGuest";
import './Bookings.css'




function Bookings({camp, sessionUser}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);


    const [bookingDetails, setBookingDetails] = useState({
        checkIn: null,
        checkOut: null,
        numGuests: 1,
        userId: sessionUser ? sessionUser.id : null,
        listingId: camp.id
    });
  
    const handleBookingDatesChange = (checkIn, checkOut) => {
        setBookingDetails((prevBookingDetails) => ({
            ...prevBookingDetails,
            checkIn,
            checkOut,
      }));
    };
  
    const handleBookingGuestChange = (numGuests) => {
        setBookingDetails((prevBookingDetails) => ({
            ...prevBookingDetails,
            numGuests,
      }));
    };

    console.log(bookingDetails)
  
    const handleSubmit = (e) => {
      e.preventDefault();
        dispatch(createNewBooking({booking: bookingDetails}));
        history.push("/bookings");
    };
  
    return (
      <>
        <div className="Booking-selector-container">
          <BookingDates onChange={handleBookingDatesChange} />
          <BookingGuest onChange={handleBookingGuestChange} />
          <button className="Book-button" onClick={(e) => handleSubmit(e)}>Book!</button>
        </div>
      </>
    );
  }
  
  export default Bookings;