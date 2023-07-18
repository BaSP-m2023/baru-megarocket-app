import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.container}>
      <div>
        <div className={styles.mainTitle}>
          <img src="/assets/images/logo3.png" alt="Rocket" className={styles.logo} />
          <p className={styles.titleMega}>Mega</p>
          <p className={styles.titleRocket}>Rocket</p>
          <div className={styles.copyright}>
            Copyright © {new Date().getFullYear()} Mega Rocket. All rights reserved.
          </div>
        </div>
        <div className={styles.social}>
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
      <div>
        <div className={styles.navigators}>
          <ul>
            <li className={styles.itemList}>Monday to Saturday from 9am to 9pm</li>
            <li className={styles.itemList}>{`Location 3° 12' 43.2" N 5° 12' 39.6" E`}</li>
            <li className={styles.itemList}>
              Contact <span>contact@megarocket.space</span>
            </li>
          </ul>
        </div>
        <div>
          <p></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
