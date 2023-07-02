import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const NavBar = ({ routes = [] }) => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.routes} data-testid="routes-list">
        <Link to="/" className={styles.a}>
          Home
        </Link>
        {routes.map((route) => (
          <li key={route.name}>
            <Link to={route.path} className={styles.a}>
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
