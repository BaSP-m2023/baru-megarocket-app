import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styles from './header.module.css';

import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import { logOut } from 'Redux/Auth/thunks';

import { Button } from 'Components/Shared/Button';
import ResponseModal from 'Components/Shared/ResponseModal';
import NavBar from './NavBar';

function Header(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const role = sessionStorage.getItem('role');
  const userLogged = useSelector((state) => state.auth.user);

  const { show, message, state } = useSelector((state) => state.toast);

  const handleLogout = async () => {
    await dispatch(logOut());
    history.push('/');
    dispatch(handleDisplayToast(true));
    dispatch(setContentToast({ message: 'See you later', state: 'success' }));
  };

  return (
    <header>
      <div className={styles.container}>
        <div data-testid="logo-container" className={styles.logoContainer}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
            alt="guy flexing on fire logo"
            className={styles.logo}
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo2.png`}
            alt="radium rocket words logo"
            className={styles.logo2}
          />
        </div>
        <div className={styles.container2}>
          {role && (
            <>
              <Link
                className={styles.profileLink}
                to={
                  role === 'SUPER_ADMIN'
                    ? `/user/super-admin/profile/${userLogged?._id}`
                    : `/user/${role.toLowerCase()}/profile/${userLogged?._id}`
                }
              >
                <div className={styles.profileContainer}>
                  <img
                    className={styles.profileImg}
                    src={`${process.env.PUBLIC_URL}/assets/images/profile-icon.png`}
                    alt="profile image"
                  />
                  {role === 'ADMIN' && `${userLogged?.firstName} ${userLogged?.lastName}`}
                  {role === 'MEMBER' && `${userLogged?.name} ${userLogged?.lastName}`}
                  {role === 'TRAINER' && `${userLogged?.firstName} ${userLogged?.lastName}`}
                  {role === 'SUPER_ADMIN' && 'SA'}
                </div>
              </Link>
              <div className={styles.logoutButton}>
                <Button classNameButton="deleteButton" action={handleLogout} text="Logout" />
              </div>
            </>
          )}
        </div>
      </div>
      <NavBar routes={props.routes} />
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
