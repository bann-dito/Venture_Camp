import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchListings } from "../../store/listings";
import CampList from "./CampList";
import CampMap from "../CampMap";
import "./ListingsIndexPage.css"

function ListingIndexPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const camps = useSelector(state => Object.values(state.listings));
    const [highlightedCamp, setHighlightedCamp] = useState(null);
    const [bounds, setBounds] = useState(null);


    useEffect(() => {
        dispatch(fetchListings());
    }, [dispatch]);


    const mapEventHandlers = useMemo(() => ({
        click: event => {
          const search = new URLSearchParams(event.latLng.toJSON()).toString();
          history.push({ pathname: '/benches/new', search });
        },
        idle: map => setBounds(map.getBounds().toUrlValue())
      }), [history]);



    return (
        <div className="camp-index-page">
            <div className="camp-listing-container">
                <CampList camps={camps} />
            </div>
            <div className="camp-index-map-container">
                <CampMap camps={camps}
                 highlightedCamp={highlightedCamp}
                 mapEventHandlers={mapEventHandlers}
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