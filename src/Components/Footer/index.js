import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.main}>
        <p className={styles.appName}>MegaRocket</p>
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
      </div>
      <div className={styles.license}>
        <div className={styles.copyright}>Copyright © {new Date().getFullYear()} Radium Rocket</div>
        <div>
          <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
            />
          </a>
          <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
            />
          </a>
          <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
