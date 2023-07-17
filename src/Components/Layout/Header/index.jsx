import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';

import { logOut } from 'Redux/Auth/thunks';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from 'Redux/DarkMode/actions';

import NavBar from './NavBar';
import styles from './header.module.css';
import ResponseModal from 'Components/Shared/ResponseModal';

function Header(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const role = sessionStorage.getItem('role');
  const { user: userLogged } = useSelector((state) => state.auth);
  const { dark } = useSelector((state) => state.darkmode);
  const { show, message, state } = useSelector((state) => state.toast);

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
    <header>
      <div className={styles.container}>
        <NavBar routes={props.routes} />
        <div className={styles.container2}>
          {role && userLogged && (
            <div className={styles.userContainer}>
              {history.location.pathname.endsWith('/home') && (
                <div className={styles.toggleContainer}>
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
                </div>
              )}
              <Link
                className={styles.profileLink}
                to={
                  role === 'SUPER_ADMIN'
                    ? `/user/super-admin/profile/${userLogged?._id}`
                    : `/user/${role.toLowerCase()}/profile/${userLogged?._id}`
                }
              >
                {userLogged?.lastName && (
                  <div className={styles.profileContainer}>
                    <img
                      className={styles.profileImg}
                      src={
                        role === 'ADMIN' || role === 'SUPER_ADMIN'
                          ? `${process.env.PUBLIC_URL}/assets/avatars/admin.jpg`
                          : role === 'TRAINER'
                          ? `${process.env.PUBLIC_URL}/assets/avatars/rocket-trainer.jpg`
                          : role === 'MEMBER' && userLogged.avatar
                          ? `${process.env.PUBLIC_URL}/assets/avatars/${userLogged.avatar}.jpg`
                          : `${process.env.PUBLIC_URL}/assets/images/profile-icon.png`
                      }
                      alt="profile image"
                    />
                    {role === 'ADMIN' && `${userLogged?.firstName} ${userLogged?.lastName}`}
                    {role === 'MEMBER' && `${userLogged?.name} ${userLogged?.lastName}`}
                    {role === 'TRAINER' && `${userLogged?.firstName} ${userLogged?.lastName}`}
                    {role === 'SUPER_ADMIN' && 'SA'}
                  </div>
                )}
              </Link>
              <div className={styles.logOutButtonContainer}>
                <button className={styles.logOutButton} onClick={handleLogout}>
                  <div className={styles.sign}>
                    <svg viewBox="0 0 512 512">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>

                  <div className={styles.text}>Logout</div>
                </button>
              </div>
            </div>
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
