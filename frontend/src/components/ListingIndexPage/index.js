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
        <div className="Listings-top=container">
            <h1>Listings</h1>
            <CampList camps={camps} />
        </div>
    );
}

export default ListingIndexPage;