import { useDispatch } from "react-redux";
import { createNewBooking, updateBooking } from "../../store/bookings";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Modal } from "../../context/Modal";
import LoginForm from "../SessionForms/LoginForm";
import BookingDates from "./BookingDates";
import BookingGuest from "./BookingGuest";
import './Bookings.css'




function Bookings({camp, sessionUser, isEditing, bookingId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    // const [isEditing, setIsEditing] = useState(false);

    const [bookingDetails, setBookingDetails] = useState({
        checkIn: null,
        checkOut: null,
        numGuests: 1,
        userId: sessionUser ? sessionUser.id : null,
        listingId: camp?.id,
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
  

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!sessionUser){
        setShowModal(true);
      } else {
        if (isEditing){
          dispatch(updateBooking({booking: bookingDetails}, bookingId));
        } else {
          dispatch(createNewBooking({booking: bookingDetails}));
          history.push("/bookings");
        }
      }
    };
  
    return (
      <>
        <div className="Booking-selector-container">
          <BookingDates onChange={handleBookingDatesChange} />
          <BookingGuest onChange={handleBookingGuestChange} />
          <button className="Book-button" onClick={(e) => handleSubmit(e)}>Reserve</button>
        </div>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
        )}
      </>
    );
  }
  
  export default Bookings;