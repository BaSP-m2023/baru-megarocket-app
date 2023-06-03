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
    </header>
  );
}

export default Header;
