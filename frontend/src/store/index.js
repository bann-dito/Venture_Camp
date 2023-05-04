import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import listingsReducer from './listings';
import userReducer from './users';
import reviewsReducer from './reviews';
import bookingsReducer from './bookings';
import * as listingsActions from './listings';
import * as reviewsActions from './reviews';
import * as bookingsActions from './bookings';


const rootReducer = combineReducers({
    session: sessionReducer,
    listings: listingsReducer,
    users: userReducer,
    reviews: reviewsReducer,
    bookings: bookingsReducer,
})


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  window.listingsActions = listingsActions;
  window.reviewsActions = reviewsActions;
  window.bookingsActions = bookingsActions;
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore

