import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styles from './header.module.css';

import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import { logOut } from 'Redux/Auth/thunks';

import Button from 'Components/Shared/Button';
import ResponseModal from 'Components/Shared/ResponseModal';
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

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
        <NavBar routes={props.routes} />
        <div className={styles.container2}>
          {role && (
            <>
              <Link
                className={styles.profileLink}
                to={`/user/${role.toLowerCase()}/profile/${userLogged?._id}`}
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
                <Button
                  classNameButton="deleteButton"
                  action={handleLogout}
                  text="Logout"
                  icon={<FontAwesomeIcon icon={faRightFromBracket} className={styles.logOutIcon} />}
                />
              </div>
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
