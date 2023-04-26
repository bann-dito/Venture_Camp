import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../../store/listings";
import CampList from "./CampList";
import "./ListingsIndexPage.css"

function ListingIndexPage() {
    const dispatch = useDispatch();
    const camps = useSelector(state => Object.values(state.listings));

    useEffect(() => {
        dispatch(fetchListings());
    }, [dispatch]);


    return (
        <div className="camp-index-page">
            <div className="camp-listing-container">
                <CampList camps={camps} />
            </div>
            <div className="camp-index-map-container">
                <h2>Coming Soon</h2>
            </div>
        </div>
    );
}

export default ListingIndexPage;