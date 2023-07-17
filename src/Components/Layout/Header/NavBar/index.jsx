import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { useSelector } from 'react-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ routes = [], showMenu, setShowMenu }) => {
  const role = sessionStorage.getItem('role');
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
              <NavLink
                activeClassName={styles.activeLink}
                className={styles.a}
                to={route.path}
                onClick={handleClick}
              >
                {route.name}
              </NavLink>
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
        )}
      </nav>
    </>
  );
};

export default NavBar;
