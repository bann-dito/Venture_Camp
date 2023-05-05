import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, removeBooking } from "../../store/bookings";
import BookingList from "./BookingList";
import { useEffect } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import './BookingsShowPage.css'

function BookingsShowPage() {
    const dispatch = useDispatch();
    const bookings = useSelector(state => Object.values(state.bookings))
    const sessionUser = useSelector(state => state.session.user);
    
    
    useEffect(() => {
        dispatch(fetchBookings())
    }, [dispatch])

    if (!sessionUser) {
        return <Redirect to="/"/>
    }

    // console.log(bookings)

    return (
        <>
        
            { bookings[0]?.userId === sessionUser?.id ? (
                <div className="Booking-info-show-container">
                    <h1>Your Upcoming Trips</h1>
                    <ul>
                        {bookings.map((booking)=>(<li key={booking.id}>{<BookingList booking={booking}/>}</li>))}
                    </ul>
                </div>
            ) : (
            <div className="No-bookings">
                <h1>You haven't booked any trips yet</h1>
                <h2>Click <a href="/listings">here</a> to find your next adventure!</h2>
                <img className="No-bookings-image" src="/assets/SvgHeart.png" />
            </div>
                )}
        </>
    )
}

export default BookingsShowPage;