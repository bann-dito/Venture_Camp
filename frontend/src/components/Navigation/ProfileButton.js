import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as sessionActions from '../../store/session';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCampground} from '@fortawesome/free-solid-svg-icons'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className='profile-button-container'>
      <button className="profile-button" onClick={() => setShowMenu(prev => !prev)}>
        <FontAwesomeIcon icon={faCampground} color="#c74f2d" bounce={showMenu} />
      </button>
      <ul className={`profile-dropdown ${showMenu ? 'show' : ''}`}>
        <li>{user.username}</li>
        <li>{user.email}</li>
        <li onClick={() => history.push('/bookings')}> Bookings </li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileButton;