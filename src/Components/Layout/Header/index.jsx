import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styles from './header.module.css';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn, faMoon, faSun, faBars } from '@fortawesome/free-solid-svg-icons';

import { logOut } from 'Redux/Auth/thunks';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import { setDarkMode } from 'Redux/DarkMode/actions';

import { Button } from 'Components/Shared/Button';
import ResponseModal from 'Components/Shared/ResponseModal';
import NavBar from './NavBar';

function Header(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const role = sessionStorage.getItem('role');
  const { user: userLogged } = useSelector((state) => state.auth);
  const { dark } = useSelector((state) => state.darkmode);
  const { show, message, state } = useSelector((state) => state.toast);
  const [showMenu, setShowMenu] = useState(false);

  const handleHamburger = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('darkMode'))) {
      dispatch(setDarkMode(true));
    } else {
      dispatch(setDarkMode(false));
    }
  }, []);

  const handleLogout = async () => {
    await dispatch(logOut());
    history.push('/');
    dispatch(handleDisplayToast(true));
    dispatch(setContentToast({ message: 'See you later', state: 'success' }));
  };

  return (
    <header className={styles.container}>
      <Link to={props.routes[0].path} className={styles.link}>
        <div data-testid="logo-container" className={styles.logoContainer}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo3.png`}
            alt="Rocket"
            className={styles.logo}
          />
          <p className={styles.mega}>Mega</p>
          <p className={styles.rocket}>Rocket</p>
        </div>
      </Link>

      <NavBar routes={props.routes} showMenu={showMenu} setShowMenu={setShowMenu} />

      <div className={styles.container2}>
        {role && userLogged && (
          <div className={styles.userContainer}>
            <div className={styles.toggleContainer}>
              <FontAwesomeIcon icon={faSun} className={`${styles.iconMode} ${styles.sun}}`} />
              {dark ? (
                <FontAwesomeIcon
                  icon={faToggleOn}
                  onClick={() => {
                    dispatch(setDarkMode(false));
                    localStorage.setItem('darkMode', JSON.stringify(false));
                  }}
                  className={styles.toggle}
                  size="2xl"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faToggleOff}
                  onClick={() => {
                    dispatch(setDarkMode(true));
                    localStorage.setItem('darkMode', JSON.stringify(true));
                  }}
                  className={styles.toggle}
                  size="2xl"
                />
              )}
              <FontAwesomeIcon icon={faMoon} className={`${styles.iconMode} ${styles.moon}}`} />
            </div>

            <div className={styles.logOutButtonContainer}>
              <button
                className={styles.logOutButton}
                onClick={handleLogout}
                data-testid="logout-btn"
              >
                <div className={styles.sign}>
                  <svg viewBox="0 0 512 512">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>
                <div className={styles.text}>Logout</div>
              </button>
            </div>
            <div className={styles.hamburger} onClick={handleHamburger}>
              <FontAwesomeIcon icon={faBars} style={{ color: '#ffffff' }} size="xl" />
            </div>
          </div>
        )}
        <div className={styles.buttonContainer} data-testid="home-buttons-container">
          {!role && (
            <>
              <Button
                text="Sign Up"
                classNameButton="submitButton"
                action={() => history.push('/auth/signup')}
              />
              <Button
                text="Log In"
                classNameButton="submitButton"
                action={() => history.push('/auth/login')}
              />
            </>
          )}
        </div>
      </div>

      {show && (
        <ResponseModal
          handler={() => dispatch(handleDisplayToast(false))}
          state={state}
          message={message}
        />
      )}
    </header>
  );
}
export default Header;
