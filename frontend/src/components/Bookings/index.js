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
    const [showCalendar, setShowCalendar] = useState(false);
    const [showGuests, setShowGuests] = useState(false);
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

    useEffect(() => {
      if (sessionUser) {
        setShowModal(false);
        setBookingDetails((prevBookingDetails) => ({
          ...prevBookingDetails,
          userId: sessionUser.id,
        }));
      }

    }, [sessionUser])

  

    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors([]);
      if (!sessionUser){
        setShowModal(true);
      } else {
        dispatch(isEditing ? updateBooking : createNewBooking({booking: bookingDetails}))
          .then(() => !isEditing && history.push("/bookings"))
          .catch(async (res) => {
              let data;
              try {
                data = await res.clone().json();
              } catch {
                data = await res.text();
              }
              if (data?.errors) setErrors(data.errors);
              else if (data) setErrors(data);
              else setErrors([res.statusText]);
            });
        // if (isEditing){
        //   dispatch(updateBooking({booking: bookingDetails}, bookingId))
        //   .catch(async (res) => {
        //     let data;
        //     try {
        //       data = await res.clone().json();
        //     } catch {
        //       data = await res.text();
        //     }
        //     if (data?.errors) setErrors(data.errors);
        //     else if (data) setErrors(data);
        //     else setErrors([res.statusText]);
        //   }); 
        // } else {
        //   dispatch(createNewBooking({booking: bookingDetails}))
        //     .then(() => history.push("/bookings"))
        //     .catch(async (res) => {
        //       let data;
        //       try {
        //         data = await res.clone().json();
        //       } catch {
        //         data = await res.text();
        //       }
        //       if (data?.errors) setErrors(data.errors);
        //       else if (data) setErrors(data);
        //       else setErrors([res.statusText]);
        //     });
        //   }
      }
    };
  
    return (
      <section className='listing-show-booking' onClick={(e) => {
        setShowCalendar(false);
        setShowGuests(false);
      }}>
        <h2>Availability</h2>
        <ul className="booking-errors-list">
          {errors.map((error, index) => (
            <li className="booking-errors" key={index}>{error}</li>
          ))}
        </ul>
        <div className="Booking-selector-container" >
          <BookingDates onChange={handleBookingDatesChange} showCalendar={showCalendar} setShowCalendar={setShowCalendar}  />
          <BookingGuest onChange={handleBookingGuestChange} showGuests={showGuests} setShowGuests={setShowGuests} />
          <button className="Book-button" onClick={(e) => handleSubmit(e)}>Reserve</button>
        </div>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
        )}
      </section>
    );
  }
  
  export default Bookings;