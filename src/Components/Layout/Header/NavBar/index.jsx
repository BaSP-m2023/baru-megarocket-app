import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';
import { Button } from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NavBar = ({ routes = [] }) => {
  const role = sessionStorage.getItem('role');
  const history = useHistory();
  const privateRoutes = routes.filter((route) => route.name !== 'Home');

  return (
    <nav className={styles.navbar}>
      <ul className={styles.routes} data-testid="routes-list">
        {privateRoutes.map((route) => (
          <li key={route.name}>
            <NavLink activeClassName={styles.activeLink} className={styles.a} to={route.path}>
              {route.name}
            </NavLink>
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
