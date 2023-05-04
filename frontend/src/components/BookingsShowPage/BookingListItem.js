import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeBooking } from '../../store/bookings';
import { fetchListing } from '../../store/listings';

function BookingListItem({booking}){

    const dispatch = useDispatch();
    const { id, listingId, checkIn, checkOut, numGuests } = booking;
    const camp = useSelector(state => state.listings[listingId])
    
    useEffect(() => {
        dispatch(fetchListing(listingId))
    }, [dispatch, listingId])

    const dateConverter = (date) => { 
        let newDate = new Date(date)
        return newDate.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric',
            year: 'numeric' 
          });
    }

    return (
        <>
            <div className="Booking-info-left">
                <h2 className="Booking-title">{camp?.title}</h2>
                <h3 className="Booking-location">In {camp?.city}, {camp?.state}</h3>
                <h3 className="Booking-date">From {dateConverter(checkIn)} to {dateConverter(checkOut)} </h3>
                <h3 className="Booking-guest">Guests: {numGuests}</h3>
            </div>
            <div className="Booking-info-right">
                <button className="Booking-delete-button" onClick={() => dispatch(removeBooking(id))}>Delete</button>
            </div>
        </>
    )
}

export default BookingListItem;