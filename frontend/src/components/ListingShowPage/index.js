import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListing } from '../../store/listings';
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

    const { title, description, price, city, state, capacity, hiking, biking} = camp;

    return (
        <div className='listing-show'>
            <div className="listing-show-header">
                <Link to="/listings">Back to Camps</Link>
                <h1>{title}</h1>
            </div>
            <div className='listing-show-visuals'>
                <h1>PICTURES GO HERE</h1>
            </div>
            <section className="listing-show-section">
                <h2>About Camp Site</h2>
                <p>{description}</p>
                <ul>
                    <li><span className='info-category'>Price: ${price}</span></li>
                    <li><span className='info-category'>Location: {city} {state} </span></li>
                    <li><span className='info-category'>Capacity: {capacity}</span></li>
                    <li><span className='info-category'>Hiking: {hiking ? "Yes" : "No"}</span></li>
                    <li><span className='info-category'>biking: {biking ? "Yes" : "No"}</span></li>
                </ul>
            </section>
            <section className='listing-show-map'>
                <h2>Map Goes Here</h2>
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