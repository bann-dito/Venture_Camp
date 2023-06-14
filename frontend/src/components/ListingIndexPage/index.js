import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchListings } from "../../store/listings";
import { useQuery } from "../../utils";
import CampList from "./CampList";
import CampMap from "../CampMap";
import "./ListingsIndexPage.css"

function ListingIndexPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const camps = useSelector(state => Object.values(state.listings))
    
    const [highlightedCamp, setHighlightedCamp] = useState(null);
    const query = useQuery();



    useEffect(() => {
        dispatch(fetchListings(query));
    }, [dispatch]);

    return (
        <div className="camp-index-page">
            <div className="camp-listing-container">
                <CampList camps={camps} 
                highlightedCamp={highlightedCamp}
                setHighlightedCamp={setHighlightedCamp} 
                />
            </div>
            <div className="camp-index-map-container">
                <CampMap camps={camps}
                 highlightedCamp={highlightedCamp}
                 mapOptions={{ zoom: 6 }}
                 markerEventHandlers={{
                    click: (camp) => history.push(`/listings/${camp.id}`),
                    mouseover: (camp) => setHighlightedCamp(camp.id),
                    mouseout: () => setHighlightedCamp(null),
                }}
                 />
            </div>
        </div>
    );
}

export default ListingIndexPage;