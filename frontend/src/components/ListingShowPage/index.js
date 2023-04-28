import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListing } from '../../store/listings';
import CampMap from '../CampMap';
import './ListingShowPage.css';


function ListingShowPage() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const camp = useSelector(state => state.listings[id]);

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

    return (
        <div className='listing-show'>
            <div className="listing-show-header">
                <Link to="/listings">
                    <i class="fa-solid fa-circle-arrow-left"></i>
                </Link>
                <h1>{title}</h1>
            </div>
            <div className='listing-show-visuals'>
                <div className='listing-show-visuals-main'>
                    {photoUrl && <img src={photoUrl} alt='Camp'/>}
                </div>
                <div className='listing-show-visuals-sub'>
                    <h1>SUB Photos</h1>
                </div>
            </div>
            <section className="listing-show-section">
                <p>{description}</p>
                <ul>
                    <h3>Activities</h3>
                    <li>
                        <span className='info-category'> 
                            <i class="fa-solid fa-person-hiking"></i>
                            Hiking: {hiking ? "Yes" : "No"}
                        </span>
                    </li>
                    <li>
                        <span className='info-category'>
                            <i class="fa-solid fa-person-biking"></i>
                            Biking: {biking ? "Yes" : "No"}
                        </span>
                    </li>
                    <li>
                        <span className='info-category'>
                            <i class="fa-solid fa-mountain"></i>
                            Rock Climbing: {rockClimbing ? "Yes" : "No"}
                        </span>
                    </li>
                    <li>
                        <span className='info-category'>
                            <i class="fa-solid fa-fish"></i>
                            Fishing: {fishing ? "Yes" : "No"}
                        </span>
                    </li>
                    <li>
                        <span className='info-category'>
                            <i class="fa-solid fa-horse"></i>
                            Horseback Riding: {horsebackRiding ? "Yes" : "No"}
                        </span>
                    </li>
                </ul>
                <ul>
                    <h3>Amenities</h3>
                    <li>
                        <span className='info-category'>
                            <i class="fa-solid fa-wifi"></i>
                            WiFi: {wifi ? "Yes" : "No"}
                        </span>
                    </li>
                    <li>
                        <span className='info-category'>
                            <i class="fa-solid fa-dog"></i>
                            Pets: {pets ? "Yes" : "No"} 
                        </span>
                    </li>
                    <li>
                        <span className='info-category'>
                            <i class="fa-solid fa-toilet"></i>
                            Toilet: {toilet ? "Yes": "No"}
                        </span>
                    </li>
                    <li>
                        <span className='info-category'>
                            <i class="fa-solid fa-bath"></i>
                            Shower: {shower ? "Yes" : "No"}
                        </span>
                    </li>
                    <li>
                        <span className='info-category'>
                            <i class="fa-solid fa-fire"></i>
                            Campfire: {campfire ? "Yes" : "No"}
                        </span>
                    </li>
                </ul>
            </section>
            <section className='listing-show-map'>
            <CampMap
                camps={[camp]}
                // mapOptions={{ center: { lat: latitude, lng: longitude }, zoom: 12 }}
            />
            </section>
            <section className='listing-show-booking'>
                <h2>Booking Goes Here</h2>
            </section>
            <section className='listing-show-reviews'>
                <h2>Reviews Go Here</h2>
                <div className='listing-review'>
                    <h3>Review Title</h3>
                </div>
            </section>
        </div>
    )
}

export default ListingShowPage;