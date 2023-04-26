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
        <div className='listings-show'>
            <div className="Listing-show-header">
                <Link to="/listings">Back to Camps</Link>
                <h1>{title}</h1>
            </div>
            <div className='listing-show-visuals'>
                
            </div>
            <section className="listing-show-details">
                <h2>About Camp Site</h2>
                <p>{description}</p>
                <p>${price}</p>
                <p>{city}, {state}</p>
                <p>Capacity: {capacity}</p>
                <p>Hiking: {hiking ? "Yes" : "No"}</p>
                <p>Biking: {biking ? "Yes" : "No"}</p>
            </section>
        </div>
    )
}

export default ListingShowPage;