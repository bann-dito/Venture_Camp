import {receiveListing} from "./listings";
import csrfFetch from './csrf';
import {addUser} from "./users";

const ADD_REVIEWS = "reviews/ADD_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const EDIT_REVIEW = "reviews/EDIT_REVIEW";
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

export const addReviews = (reviews) => ({
    type: ADD_REVIEWS,
    reviews,
});

export const addReview = (review) => ({
    type: ADD_REVIEW,
    review,
});

export const editReview = (review) => ({
    type: EDIT_REVIEW,
    review,
})

export const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId,
});

export const getListingReviews = (listingId) => state => {
    const reviews = Object.values(state.reviews);
    const filtered = reviews.filter(review => review.listingId === listingId);
    const mapped = filtered.map(review => ({
        ...review, author: state.users[review.authorId]?.username
    }));
    return mapped;
}

export const createReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify(review),
    });
    const data = await response.json();
    dispatch(addReview(data.review));
    dispatch(receiveListing(data.listing));
    dispatch(addUser(data.user));
    return response;
}

export const updateReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PATCH',
        body: JSON.stringify(review),
    });
    const data = await response.json();
    dispatch(editReview(data.review));
    dispatch(receiveListing(data.listing));
    return response;
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    dispatch(removeReview(data.review.id));
    dispatch(receiveListing(data.listing));
    return response;
}


function reviewsReducer(state = {}, action) {
    Object.freeze(state);
    const newState = {...state};
    switch (action.type) {
        case ADD_REVIEWS:
            return {...newState, ...action.reviews}
        case ADD_REVIEW:
            return {...newState, [action.review.id]: action.review}
        case EDIT_REVIEW:
            newState[action.review.id] = action.review;
            return newState;
        case REMOVE_REVIEW:
            delete newState[action.reviewId];
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;