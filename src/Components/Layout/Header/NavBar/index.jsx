import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';

const NavBar = ({ routes = [], showMenu, setShowMenu }) => {
  const role = sessionStorage.getItem('role');
  const location = useLocation();
  const { user: userLogged } = useSelector((state) => state.auth);

  const privateRoutes = routes.filter((route) => route.name !== 'Home');
  const handleClick = () => {
    setShowMenu(false);
  };
  return (
    <>
      <nav className={`${styles.navbar} ${!showMenu ? styles.hidden : ''}`}>
        <ul className={styles.routes} data-testid="routes-list">
          {privateRoutes.map((route) => (
            <li key={route.name}>
              <Link
                to={route.path}
                className={`${styles.a} ${
                  location.pathname.includes(route.name.toLowerCase()) && styles.active
                }`}
                onClick={handleClick}
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
        {userLogged?.lastName && (
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
        )}
      </nav>
    </>
  );
};

export default NavBar;
