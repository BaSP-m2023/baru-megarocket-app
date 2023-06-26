import styles from './header.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutMember, loginMemberSuccess } from 'Redux/LoginMembers/actions';
import Button from 'Components/Shared/Button';
import ResponseModal from 'Components/Shared/ResponseModal';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
function Header() {
  const dispatch = useDispatch();
  const { isLogged, data } = useSelector((state) => state.loginMembers);
  const { show, message, state } = useSelector((state) => state.toast);
  const history = useHistory();
  const [layout, setLayout] = useState({ membership: '', name: '' });
  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLayout({
        membership: JSON.parse(localStorage.getItem('login')).membership,
        name: `${JSON.parse(localStorage.getItem('login')).name}
      ${JSON.parse(localStorage.getItem('login')).lastName}`
      });
      dispatch(loginMemberSuccess(JSON.parse(localStorage.getItem('login'))));
    }
  }, [localStorage.getItem('login')]);
  useEffect(() => {
    if (data) {
      setLayout({ membership: data.membership, name: `${data.name} ${data.lastName}` });
    }
  }, [data]);
  const handleLogout = () => {
    localStorage.removeItem('login');
    dispatch(handleDisplayToast(true));
    dispatch(setContentToast({ message: 'See you later', state: 'success' }));
    dispatch(logoutMember());
    setLayout({ membership: '', name: '' });
    history.push('/');
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
        {isLogged && (
          <div className={styles.optionContainer} data-testid="logout-container">
            {data && (
              <Link className={styles.profileLink} to={`/user/member/profile/${data._id}`}>
                <div className={styles.profileContainer}>
                  <img
                    className={styles.profileImg}
                    src={`${process.env.PUBLIC_URL}/assets/images/profile-icon.png`}
                    alt="profile image"
                  />
                  {layout.name}
                </div>
              </Link>
            )}
            <div className={styles.logoutButton}>
              <Button classNameButton="deleteButton" action={handleLogout} text="Logout" />
            </div>
          </div>
        )}
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.rutes} data-testid="routes-list">
          {!layout.membership && (
            <>
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
            </>
          )}
          {layout.membership === 'classic' && (
            <>
              <Link to="/" className={styles.a}>
                Home
              </Link>
            </>
          )}
          {layout.membership && layout.membership !== 'classic' && (
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
