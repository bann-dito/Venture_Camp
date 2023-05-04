import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import ListingIndexPage from "./components/ListingIndexPage";
import ListingShowPage from "./components/ListingShowPage";
import BookingsShowPage from "./components/BookingsShowPage";


function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route exact path="/bookings">
            <BookingsShowPage />
          </Route>
          <Route exact path="/listings">
            <ListingIndexPage />
          </Route>
          <Route exact path="/listings/:id">
            <ListingShowPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;
