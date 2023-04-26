import csrfFetch from "./csrf";

const RECEIVE_LISTINGS = "listings/setListings";
const RECEIVE_LISTING = "listings/setListing";

const receiveListings = (listings) => ({
    type: RECEIVE_LISTINGS,
    listings
});

const receiveListing = (listing) => ({
    type: RECEIVE_LISTING,
    listing
});

export const fetchListings = () => async (dispatch) => {
    const response = await csrfFetch("/api/listings");
    const {listings} = await response.json();
    dispatch(receiveListings(listings));
}

export const fetchListing = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/listings/${id}`);
    const {listing} = await response.json();
    dispatch(receiveListing(listing));
}




const listingsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_LISTINGS:
            return action.listings;
        case RECEIVE_LISTING:
            // const newState = {}
            // return newState[action.listing.id] = action.listing
            return {...state, [action.listing.id]: action.listing}
        default:
            return state;
    }
}

export default listingsReducer;
