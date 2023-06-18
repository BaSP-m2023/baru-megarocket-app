import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutMember, loginMemberSuccess } from 'Redux/LoginMembers/actions';
import Button from 'Components/Shared/Button';
import ResponseModal from 'Components/Shared/ResponseModal';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';

function Header() {
  const dispatch = useDispatch();
  const { isLogged, data } = useSelector((state) => state.loginMembers);
  const { show, message, state } = useSelector((state) => state.toast);
  const keys = [
    '_id',
    'name',
    'lastName',
    'dni',
    'phone',
    'email',
    'city',
    'dob',
    'zip',
    'isActive',
    'membership'
  ];

  useEffect(() => {
    if (localStorage.getItem('_id')) {
      let user = [];
      keys.forEach((key) => {
        user.push({ key, value: localStorage.getItem(key) });
      });
      dispatch(loginMemberSuccess(user));
    }
  }, []);

  const handleLogout = () => {
    keys.forEach((key) => {
      localStorage.removeItem(key);
    });
    dispatch(handleDisplayToast(true));
    dispatch(setContentToast({ message: 'See you later', state: 'success' }));
    dispatch(logoutMember());
  };
  return (
    <header>
      <div className={styles.container}>
        <div>
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
        {isLogged && (
          <div className={styles.optionContainer}>
            {data.length && (
              <Link className={styles.profileLink} to={`/user/member/profile/${data[0].value}`}>
                <div className={styles.profileContainer}>
                  <img
                    className={styles.profileImg}
                    src={`${process.env.PUBLIC_URL}/assets/images/profile-icon.png`}
                    alt="profile image"
                  />
                  {data[1].value} {data[2].value}
                </div>
              </Link>
            )}
            <Button classNameButton="deleteButton" action={handleLogout} text="Logout" />
          </div>
        )}
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.rutes}>
          <Link to="/" className={styles.a}>
            Home
          </Link>
          <Link to="/activities" className={styles.a}>
            Activities
          </Link>
          <Link to="/admins" className={styles.a}>
            Admins
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
          <Link to="/super-admins" className={styles.a}>
            Super Admins
          </Link>
          <Link to="/trainers" className={styles.a}>
            Trainers
          </Link>
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
