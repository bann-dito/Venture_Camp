import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import {LoginFormModal, SignupFormModal} from '../SessionForms';
import * as sessionActions from "../../store/session"
import './Navigation.css';

function Navigation(){
  // const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);

  // useEffect(() => {
  //   if (sessionUser) {
  //     dispatch(sessionActions.restoreSession())
  //   }
  // },[dispatch, sessionUser])

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
    <header className="site-header">
      <NavLink exact to="/" className="nav-title">
        <h1>Venture Camp</h1>
      </NavLink>
      <div className="session-links">
        {sessionLinks}
      </div>
    </header>
  );
}

export default Navigation;