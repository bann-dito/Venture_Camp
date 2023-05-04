import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { removeBooking } from '../../store/bookings';
import { fetchListing } from '../../store/listings';
import BookingListItem from './BookingListItem';


function BookingList({booking}) {
    const history = useHistory();


    return (
        <>
            <ul className="Bookings-list">
                <li>
                    <div onClick={() => history.push(`/listings/${booking.listingId}`)} className="Booking-image-container">image goes here</div>
                </li>
                <li>
                    <div className="Bookings-info-container">
                        <BookingListItem booking={booking}/>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default BookingList;