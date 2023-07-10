import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { Button } from 'Components/Shared/Button';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const NavBar = ({ routes = [] }) => {
  const role = sessionStorage.getItem('role');
  const history = useHistory();
  const location = useLocation();

  const privateRoutes = routes.filter((route) => route.name !== 'Home');

  return (
    <nav className={styles.navbar}>
      <Link to={routes[0].path}>
        <div data-testid="logo-container" className={styles.logoContainer}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
            alt="Flexing on fire logo"
            className={styles.logo}
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo2.png`}
            alt="MegaRocket words logo"
            className={styles.logo2}
          />
        </div>
      </Link>
      <ul className={styles.routes} data-testid="routes-list">
        {privateRoutes.map((route) => (
          <li key={route.name}>
            <Link
              to={route.path}
              className={`${styles.a} ${
                location.pathname.includes(route.name.toLowerCase()) && styles.active
              }`}
            >
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
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
    </nav>
  );
};

export default NavBar;
