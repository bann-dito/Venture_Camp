import { addReviews } from "./reviews";
import { addUsers } from "./users";

import csrfFetch from "./csrf";

const RECEIVE_LISTINGS = "listings/setListings";
const RECEIVE_LISTING = "listings/setListing";
const SEARCH_LISTINGS = "listings/searchListings";

export const receiveListings = (listings) => ({
    type: RECEIVE_LISTINGS,
    listings
});

export const receiveListing = (listing) => ({
    type: RECEIVE_LISTING,
    listing
});

export const searchListings = (listings) => ({
    type: SEARCH_LISTINGS,
    listings
});

export const fetchListings = () => async (dispatch) => {
    const response = await csrfFetch("/api/listings");
    const {listings} = await response.json();
    dispatch(receiveListings(listings));
}

export const fetchListing = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/listings/${id}`);
    const {listing, users, reviews} = await response.json();
    dispatch(receiveListing(listing));
    dispatch(addReviews(reviews));
    dispatch(addUsers(users));
}

export const fetchListingsBySearch = (search) => async (dispatch) => {
    const response = await csrfFetch(`/api/search?search=${search}`);
    const {listings} = await response.json();
    dispatch(searchListings(listings));
}


const listingsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_LISTINGS:
            return action.listings;
        case RECEIVE_LISTING:
            // const newState = {}
            // return newState[action.listing.id] = action.listing
            return {...state, [action.listing.id]: action.listing}
        case SEARCH_LISTINGS:
            return action.listings;
        default:
            return state;
    }
}

export default listingsReducer;
