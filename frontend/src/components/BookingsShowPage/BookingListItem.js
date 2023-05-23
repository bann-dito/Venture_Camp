import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeBooking, updateBooking  } from '../../store/bookings';
import { fetchListing } from '../../store/listings';
import Bookings from '../Bookings';

function BookingListItem({booking}){

    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const { id, listingId, checkIn, checkOut, numGuests } = booking;
    const camp = useSelector(state => state.listings[listingId])
    const sessionUser = useSelector(state => state.session.user)

    
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
            <div className='Bookings-info-container'>
                <div className="Booking-info-left">
                    <h2 className="Booking-title">{camp?.title}</h2>
                    <h3 className="Booking-location">In {camp?.city}, {camp?.state}</h3>
                    <h3 className="Booking-date">From {dateConverter(checkIn)} to {dateConverter(checkOut)} </h3>
                    <h3 className="Booking-guest">Guests: {numGuests}</h3>
                </div>
                <div className="Booking-info-right">
                    <div className='booking-change-buttons'>
                        <button className='Booking-edit-button' onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit"}</button>
                        <button className="Booking-delete-button" onClick={() => dispatch(removeBooking(id))}>Delete</button>
                    </div>
                </div>
            </div>
            { isEditing && (
                <div className='Booking-info-bottom'>
                    <Bookings camp={camp} sessionUser={sessionUser} isEditing={isEditing} bookingId={id} />
                </div>
                )}
        </>
    )
}

export default BookingListItem;