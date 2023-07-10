import { useRef } from 'react';
import styles from 'Components/Landing/landing.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faDumbbell,
  faMoneyCheck,
  faRocket,
  faCloud,
  faUserAstronaut,
  faCircle,
  faStar
} from '@fortawesome/free-solid-svg-icons';

function Landing() {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className={styles.landing}>
      <section
        className={styles.welcomeSection}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(35,31,32,0) 0%, rgba(96,96,180,0.20211834733893552) 82%, rgba(106,106,204,0.19091386554621848) 95%, rgba(255,255,255,1) 100%), url(${process.env.PUBLIC_URL}/assets/images/background.jpg)`
        }}
      >
        <h1 className={styles.brandName}>MegaRocket Web</h1>
        <p className={styles.brandDescription}>
          Mega Rocket web is a monthly management system for members and trainers to dynamically
          manage their activities in the gym.
        </p>

        <button className={styles.button} onClick={handleClick}>
          See Membership Plans
          <FontAwesomeIcon icon={faRocket} style={{ paddingLeft: 8 }} size="2xl" />
        </button>
      </section>
      <div className={styles.container}>
        <div className={styles.aboutSection}>
          <article className={styles.about_col_1}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/img1.svg`} alt="Gym Image" />

            <p className={styles.p}>
              At Mega Rocket, we pride ourselves on being a leading gym in Rosario, Santa Fe,
              Argentina. With our state-of-the-art facilities, experienced trainers, and
              personalized approach, we are dedicated to helping you achieve your fitness goals.
              Join us at Mega Rocket Web and experience a fitness community like no other, where you
              can find motivation, encouragement, and a welcoming environment to inspire your
              fitness journey.
            </p>
          </article>
          <article className={styles.about_col_2}>
            <p className={styles.p}>
              Our gym values revolve around creating a welcoming and inclusive environment for all
              members. We believe in empowering individuals through fitness and providing a
              supportive community where everyone can thrive. With a wide range of classes,
              specialized programs, and expert guidance, we are here to support you on your fitness
              journey.
            </p>
            <img src={`${process.env.PUBLIC_URL}/assets/images/img3.svg`} alt="Gym Image" />
          </article>
        </div>
        <section className={styles.featuresSection}>
          <div className={styles.feature}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faMoneyCheck} />
            </div>
            <h2 className={styles.h2}>Manage Your Subscription</h2>
            <p className={styles.p}>
              Effortlessly manage your gym membership subscription, including upgrades, downgrades,
              and cancellations.
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
            <h2 className={styles.h2}>Enroll to Weekly Classes</h2>
            <p className={styles.p}>
              Explore a wide range of weekly classes and easily enroll in your preferred sessions to
              stay fit and motivated.
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faDumbbell} />
            </div>
            <h2 className={styles.h2}>See a List of Activities Available</h2>
            <p className={styles.p}>
              Browse through the extensive list of activities offered by the gym and choose the ones
              that suit your fitness goals.
            </p>
          </div>
        </section>
        <section className={styles.membershipsSection} ref={ref}>
          <h3 className={styles.h3}>Choose your plan</h3>
          <div className={styles.cardsContainer}>
            <div className={styles.membershipCard}>
              <div className={styles.tier}>
                <FontAwesomeIcon icon={faUserAstronaut} style={{ color: '#373867' }} size="2xl" />
              </div>
              <h3>Only Classes</h3>
              <ul className={styles.ul}>
                <li>
                  <FontAwesomeIcon icon={faCircle} style={{ paddingRight: '10' }} fade size="2xs" />
                  Access to classes with prior registration
                </li>
                <li>
                  <FontAwesomeIcon icon={faCircle} style={{ paddingRight: '10' }} fade size="2xs" />
                  Schedule visualization
                </li>
              </ul>
              <div className={styles.price}>$100</div>
            </div>

            <div className={styles.membershipCard}>
              <div className={styles.tier}>
                <FontAwesomeIcon
                  icon={faCloud}
                  style={{ color: '#6d15e8', alignSelf: 'center' }}
                  size="lg"
                />
                <FontAwesomeIcon icon={faUserAstronaut} style={{ color: '#373867' }} size="2xl" />
                <FontAwesomeIcon icon={faStar} style={{ color: '#dedeef93' }} size="lg" />
              </div>

              <h3>Classic</h3>
              <ul className={styles.ul}>
                <li>
                  <FontAwesomeIcon icon={faCircle} style={{ paddingRight: '10' }} fade size="2xs" />
                  Access to the gym area
                </li>
                <li>
                  <FontAwesomeIcon icon={faCircle} style={{ paddingRight: '10' }} fade size="2xs" />
                  Personalized training guidance by a coach
                </li>
                <li>
                  <FontAwesomeIcon icon={faCircle} style={{ paddingRight: '10' }} fade size="2xs" />
                  Schedule visualization
                </li>
              </ul>
              <div className={styles.price}>$200</div>
            </div>
            <div className={styles.membershipCard}>
              <div className={styles.tier}>
                <FontAwesomeIcon icon={faCloud} style={{ color: '#6d15e8' }} size="lg" />
                <FontAwesomeIcon icon={faUserAstronaut} style={{ color: '#373867' }} size="2xl" />
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ color: '#e8b315', alignSelf: 'flex-end' }}
                  size="lg"
                />
              </div>
              <h3>Black</h3>
              <ul className={styles.ul}>
                <li>
                  <FontAwesomeIcon icon={faCircle} style={{ paddingRight: '10' }} fade size="2xs" />
                  Access to the gym area
                </li>
                <li>
                  <FontAwesomeIcon icon={faCircle} style={{ paddingRight: '10' }} fade size="2xs" />
                  Access to classes with prior registration
                </li>
                <li>
                  <FontAwesomeIcon icon={faCircle} style={{ paddingRight: '10' }} fade size="2xs" />
                  Personalized training guidance by a coach
                </li>
                <li>
                  <FontAwesomeIcon icon={faCircle} style={{ paddingRight: '10' }} fade size="2xs" />
                  Schedule visualization
                </li>
              </ul>
              <div className={styles.price}>$300</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Landing;
