import styles from './header.module.css';

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
          <li>
            <a href={'/'}>Home</a>
          </li>
          <li>
            <a href={'/activities'}>Activities</a>
          </li>
          <li>
            <a href={'/admins'}>Admins</a>
          </li>
          <li>
            <a href={'/classes'}>Classes</a>
          </li>
          <li>
            <a href={'/members'}>Members</a>
          </li>
          <li>
            <a href={'/subscriptions'}>Subscriptions</a>
          </li>
          <li>
            <a href={'/super-admins'}>Super Admins</a>
          </li>
          <li>
            <a href={'/trainers'}>Trainers</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
