import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { removeBooking } from '../../store/bookings';
import { fetchListing } from '../../store/listings';
import BookingListItem from './BookingListItem';


function BookingList({booking}) {
    const history = useHistory();
    const { id, listingId, checkIn, checkOut, numGuests } = booking;
    const camp = useSelector(state => state.listings[listingId])
    // console.log(camp?.title)
    const title = camp?.title
    // console.log(title)

    let imagePath;
    if (title === 'Death Valley National Park') {
        imagePath = "death-valley"
    } else if (title === 'Channel Islands National Park') {
        imagePath = "channel-islands"
    } else if (title === 'Joshua Tree National Park') {
        imagePath = "joshua-tree"
    } else if (title === 'Kings Canyon National Park') {
        imagePath = "kings-canyon"
    } else if (title === 'Lassen Volcanic National Park') {
        imagePath = "lassen-volcanic"
    } else if (title === 'Pinnacles National Park') {
        imagePath = "pinnacles"
    } else if (title === 'Redwood National and State Parks') {
        imagePath = "redwood"
    } else if (title === 'Sequoia National Park') {
        imagePath = "sequoia-national"
    } else if (title === 'Yosemite National Park') {
        imagePath = "yosemite"
    }

    return (
        <>
            <ul className="Bookings-list">
                <li>
                    <div onClick={() => history.push(`/listings/${booking.listingId}`)} 
                    className="Booking-image-container">
                        <img className="Booking-image" src={`/assets/${imagePath}.jpg`} alt="camping" />
                    </div>
                </li>
                <li>
                    {/* <div className="Bookings-info-container"> */}
                    <div className='Bookings-list-container'>
                        <BookingListItem booking={booking}/>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default BookingList;