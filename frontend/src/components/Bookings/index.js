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
    const [errors, setErrors] = useState([]);
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
      setErrors([]);
      if (!sessionUser){
        setShowModal(true);
      } else {
        if (isEditing){
          dispatch(updateBooking({booking: bookingDetails}, bookingId))
          //How can I setup error handling for this booking update?
          .catch(async (res) => {
            let data;
            try {
              // .clone() essentially allows you to read the response body twice
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if the server is down
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
          }); 
        } else {
          dispatch(createNewBooking({booking: bookingDetails}))
            .then(() => history.push("/bookings"))
            .catch(async (res) => {
              let data;
              try {
                data = await res.clone().json();
              } catch {
                data = await res.text();
              }
              if (data?.errors) setErrors(data.errors);
              else if (data) setErrors([data]);
              else setErrors([res.statusText]);
            });
          }
      }
    };
  
    return (
      <>
        {console.log(errors)}
        <ul>
          {errors.map((error) => (
            <li className="booking-errors" key={error}>{error}</li>
          ))}
        </ul>
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