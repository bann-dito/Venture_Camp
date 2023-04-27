import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import {LoginFormModal, SignupFormModal} from '../SessionForms';
import './Navigation.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function Navigation(){
  const sessionUser = useSelector(state => state.session.user);
  const {id} = useParams()
  const location = useLocation();
  console.log(location);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <header className={location.pathname !=="/" && location.pathname !==`/listings/${id}` ? "site-header-active site-header" : "site-header"}>
      <NavLink exact to="/" className="nav-title" >
        <h1>VENTURE CAMP</h1>
      </NavLink>
      <div className="session-links">
        {sessionLinks}
      </div>
    </header>
  );
}

export default Navigation;