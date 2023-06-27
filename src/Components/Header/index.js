import styles from './header.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'Components/Shared/Button';
import ResponseModal from 'Components/Shared/ResponseModal';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import { getAuth, logOut } from 'Redux/Auth/thunks';
import { tokenListener } from 'Components/helper/firebase';
import { useEffect } from 'react';
import { editMemberSuccess } from 'Redux/Members/actions';
function Header() {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');
  const userLogged = useSelector((state) => state.auth.user);
  useEffect(() => {
    tokenListener();
  }, []);
  useEffect(() => {
    if (token) {
      dispatch(getAuth(token));
    }
  }, [token, editMemberSuccess]);

  const { show, message, state } = useSelector((state) => state.toast);
  const history = useHistory();
  const handleLogout = async () => {
    await dispatch(logOut());
    history.push('/');
    dispatch(handleDisplayToast(true));
    dispatch(setContentToast({ message: 'See you later', state: 'success' }));
  };
  return (
    <header>
      <div className={styles.container}>
        <div data-testid="logo-container">
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
        <div className={styles.container}>
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
                  {role == 'ADMIN'
                    ? `${userLogged?.firstName} ${userLogged?.lastName}`
                    : `${userLogged?.name} ${userLogged?.lastName}`}
                </div>
              </Link>
              <div className={styles.logoutButton}>
                <Button classNameButton="deleteButton" action={handleLogout} text="Logout" />
              </div>
              <div className={styles.optionContainer}></div>
            </>
          )}
        </div>
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.rutes} data-testid="routes-list">
          {role === 'ADMIN' && (
            <>
              <Link to="/" className={styles.a}>
                Home
              </Link>
              <Link to="/activities" className={styles.a}>
                Activities
              </Link>
              <Link to="/classes" className={styles.a}>
                Classes
              </Link>
              <Link to="/members" className={styles.a}>
                Members
              </Link>
              <Link to="/subscriptions" className={styles.a}>
                Subscriptions
              </Link>
              <Link to="/trainers" className={styles.a}>
                Trainers
              </Link>
            </>
          )}
          {role === 'SUPER_ADMIN' && (
            <>
              <Link to="/" className={styles.a}>
                Home
              </Link>
              <Link to="/admins" className={styles.a}>
                Admins
              </Link>
            </>
          )}
          {role === 'MEMBER' && (
            <>
              <Link to="/" className={styles.a}>
                Home
              </Link>
              <Link to="/user/members/subscribe-class" className={styles.a}>
                Activities
              </Link>
              <Link to="/user/members/subscriptions" className={styles.a}>
                Subscriptions
              </Link>
            </>
          )}
        </ul>
      </nav>
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
