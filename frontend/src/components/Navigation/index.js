import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import {LoginFormModal, SignupFormModal} from '../SessionForms';
import './Navigation.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLinkedin, faGithub} from '@fortawesome/free-brands-svg-icons'

function Navigation(){
  const sessionUser = useSelector(state => state.session.user);
  const {id} = useParams()
  const location = useLocation();

  
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
      <a className='socials' href='https://www.linkedin.com/in/eduardobacsierra/' target="_blank">  
        <FontAwesomeIcon icon={faLinkedin} color="#0a66c2"/>
      </a>
      <a className='socials' href='https://github.com/bann-dito' target="_blank">
        <FontAwesomeIcon icon={faGithub} color="#0a0a0b"/>
      </a>
      <div className="session-links">
        {sessionLinks}
      </div>
    </header>
  );
}

export default Navigation;