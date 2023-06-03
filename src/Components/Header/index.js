import styles from './header.module.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div>
          <img
            src="assets/images/logo.png"
            alt="guy flexing on fire logo"
            className={styles.logo}
          />
        </div>
        <div>
          <img
            src="assets/images/logo2.png"
            alt="radium rocket words logo"
            className={styles.logo2}
          />
        </div>
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.rutes}>
          <Link to="/">
            <a className={styles.a}>Home</a>
          </Link>
          <Link to="/activities">
            <a className={styles.a}>Activities</a>
          </Link>
          <Link to="/admins">
            <a className={styles.a}>Admins</a>
          </Link>
          <Link to="/classes">
            <a className={styles.a}>Classes</a>
          </Link>
          <Link to="/members">
            <a className={styles.a}>Members</a>
          </Link>
          <Link to="/subscriptions">
            <a className={styles.a}>Subscriptions</a>
          </Link>
          <Link to="/super-admins">
            <a className={styles.a}>Super Admins</a>
          </Link>
          <Link to="/trainers">
            <a className={styles.a}>Trainers</a>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
