import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [iconClass, setIconClass] = useState("fa-solid fa-campground")
  const history = useHistory();
  
  const openMenu = () => {
    setShowMenu(true);
    setIconClass("fa-solid fa-campground fa-bounce")
  };

  const closeMenu = () => {
    setShowMenu(false);
    setIconClass("fa-solid fa-campground")
  };
  
  useEffect(() => {
    if (!showMenu) return;

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className='profile-button-container'>
      <button className="profile-button" onClick={openMenu}>
        <i className={iconClass} style={{color: "#c74f2d"}}></i>
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