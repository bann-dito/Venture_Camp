import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListing } from '../../store/listings';
import CampMap from '../CampMap';
import ReviewFormModal from '../ListingReview';
import './ListingShowPage.css';
import { getListingReviews, deleteReview } from '../../store/reviews';
import Bookings from '../Bookings';



function ListingShowPage() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const camp = useSelector(state => state.listings[id]);
    const sessionUser = useSelector(state => state.session.user);
    const reviews = useSelector(getListingReviews(parseInt(id)));


    useEffect(() => {
        if(id) {
            dispatch(fetchListing(id));
        }
    }, [dispatch, id]);

    if (!camp) {
        return null;
    }

    const { 
        title, description, price, city, state, capacity, 
        hiking, biking, rockClimbing, fishing, horsebackRiding, 
        wifi, pets, toilet, shower, campfire,
        longitude, latitude, photoUrl
    } = camp;

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
    } else if (title === 'Redwood National Park') {
        imagePath = "redwood"
    } else if (title === 'Sequoia National Park') {
        imagePath = "sequoia-national"
    } else if (title === 'Yosemite National Park') {
        imagePath = "yosemite"
    }

    const average = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    const hasReviewed = sessionUser && reviews.some(review => review.authorId === sessionUser.id);
    // frontend/public/assets/Death Valley National Park.jpg
    return (
        <div className='listing-show'>
            <div className="listing-show-header">
                <Link to="/listings">
                    <i className="fa-solid fa-circle-arrow-left"></i>
                </Link>
                <h1>{title}</h1>
            </div>
            <div className='listing-show-visuals'>
                <div className='listing-show-visuals-main'>
                    <img src={`/assets/${imagePath}.jpg`} alt='Camp'/>
                </div>
                {/* <div className='listing-show-visuals-sub'>
                    <h1>SUB Photos</h1>
                </div> */}
            </div>
            <section className="listing-show-section">
                <p>{description}</p>
                <ul>
                    <h3>Activities</h3>
                    <li>
                        <span className='info-category'> 
                            <i className="fa-solid fa-person-hiking"></i>
                            Hiking: {hiking ? "Yes" : "No"}
                        </span>
                    </li>
                    <li>
                        <span className='info-category'>
                            <i className="fa-solid fa-person-biking"></i>
                            Biking: {biking ? "Yes" : "No"}
                        </span>
                    </li>
                    <li>
                        <span className='info-category'>
                            <i className="fa-solid fa-mountain"></i>
                            Rock Climbing: {rockClimbing ? "Yes" : "No"}
                        </span>
                    </li>
                    <li>
                        <span className='info-category'>
                            <i className="fa-solid fa-fish"></i>
                            Fishing: {fishing ? "Yes" : "No"}
                        </span>
                    </li>
                    <li>
                        <span className='info-category'>
                            <i className="fa-solid fa-horse"></i>
                            Horseback Riding: {horsebackRiding ? "Yes" : "No"}
                        </span>
                    </li>
                </ul>
                <ul>
                    <h3>Amenities</h3>
                    <li>
                        <span className='info-category'>
                            <i className="fa-solid fa-wifi"></i>
                            WiFi: {wifi ? "Yes" : "No"}
                        </span>
                    </li>
                    <li>
                        <span className='info-category'>
                            <i className="fa-solid fa-dog"></i>
                            Pets: {pets ? "Yes" : "No"} 
                        </span>
                    </li>
                    <li>
                        <span className='info-category'>
                            <i className="fa-solid fa-toilet"></i>
                            Toilet: {toilet ? "Yes": "No"}
                        </span>
                    </li>
                    <li>
                        <span className='info-category'>
                            <i className="fa-solid fa-bath"></i>
                            Shower: {shower ? "Yes" : "No"}
                        </span>
                    </li>
                    <li>
                        <span className='info-category'>
                            <i className="fa-solid fa-fire"></i>
                            Campfire: {campfire ? "Yes" : "No"}
                        </span>
                    </li>
                </ul>
            </section>
            <section className='listing-show-booking'>
                <h2>Booking Goes Here</h2>
                <Bookings camp={camp} sessionUser={sessionUser}/>
            </section>
            <section className='listing-show-map'>
            <CampMap
                camps={[camp]}
                mapOptions={{ center: { lat: latitude, lng: longitude }, zoom: 11 }}
            />
            </section>
            <section className='listing-show-reviews'>

                <h2>{reviews.length} Reviews - {average} Average</h2>
                <div className='listing-review'>
                    {reviews.map(review => (
                        <div className="review" key={review.id}>
                            <h2>Rating: {review.rating}</h2>
                            <h3>{review.author}</h3>
                            <p>{review.body}</p>
                            {review.authorId === sessionUser?.id && (
                                <button
                                    className="delete-review"
                                    onClick={() => dispatch(deleteReview(review.id))}
                                >
                                    <i className="fa-solid fa-rectangle-xmark" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                {!hasReviewed && <ReviewFormModal listingId={id} />}
            </section>
        </div>
    )
}

export default ListingShowPage;