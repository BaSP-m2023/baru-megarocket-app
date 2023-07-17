import { useRef } from 'react';
import styles from 'Components/Landing/landing.module.css';
import { useHistory } from 'react-router-dom';
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
import { useSelector } from 'react-redux';

import Loader from 'Components/Shared/Loader';

function Landing() {
  const ref = useRef(null);
  const history = useHistory();
  const { dark } = useSelector((state) => state.darkmode);
  const { user } = useSelector((state) => state.auth);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleClickMembership = (value) => {
    if (!sessionStorage.getItem('role')) {
      localStorage.setItem('membership', value);
      history.push('/auth/signup');
    }
  };

  const membershipButton = (plan) => {
    const price = {
      black: '89,99',
      classic: '49,99',
      only_classes: '34,99'
    };

    if (sessionStorage.getItem('role') && sessionStorage.getItem('role') !== 'MEMBER') {
      return (
        <p className={styles.priceDetail}>
          {`${price[plan]}`}
          <span>U$S/month</span>
        </p>
      );
    }

    if (user?.membership === plan && user?.isActive) {
      return (
        <p className={styles.priceDetail}>
          Actual membership <span>Your bill is {`${price[plan]}`}U$S per month</span>
        </p>
      );
    }

    if (user?.membership === plan && !user?.isActive) {
      return (
        <>
          <p className={styles.priceDetail}>
            <span>Your membership is being accepted...</span>
          </p>
          <Loader />
        </>
      );
    }

    if (user?.membership !== plan && user?.isActive) {
      return (
        <>
          <p className={styles.priceDetail}>
            {`${price[plan]}`}
            <span>U$S/month</span>
            <br />
            <span className={styles.membershipChange}>
              Talk with administration if you want to change your membership.
            </span>
          </p>
        </>
      );
    }

    if (user?.membership !== plan && !user?.isActive && user) {
      return (
        <>
          <p className={styles.priceDetail}>
            {`${price[plan]}`}
            <span>U$S/month</span>
            <br />
            <span className={styles.membershipChange}>
              You have already requested other membership.
            </span>
          </p>
        </>
      );
    }

    return (
      <>
        <p className={styles.priceDetail}>
          {`${price[plan]}`}
          <span>U$S/month</span>
        </p>
        <button onClick={() => handleClickMembership(plan)} className={styles.subscribeBtn}>
          Subscribe now
        </button>
      </>
    );
  };

  return (
    <div className={!dark ? styles.landing : styles.darkLanding}>
      <section
        className={styles.welcomeSection}
        style={
          !dark
            ? {
                backgroundImage: `linear-gradient(180deg, rgba(35,31,32,0) 0%, rgba(96,96,180,0.20211834733893552) 82%, rgba(106,106,204,0.19091386554621848) 95%), url(${process.env.PUBLIC_URL}/assets/images/background.jpg)`
              }
            : {
                backgroundImage: `linear-gradient(rgba(35, 31, 32, 0) 0%, rgba(96, 96, 180, 0.204) 82%, rgba(106, 106, 204, 0.192) 95%), url(${process.env.PUBLIC_URL}/assets/images/background.jpg)`
              }
        }
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
            <div
              className={
                user?.isActive && user.membership === 'only_classes'
                  ? `${styles.membershipCard} ${styles.actualPlan}`
                  : styles.membershipCard
              }
            >
              <div className={styles.tier}>
                <FontAwesomeIcon
                  icon={faUserAstronaut}
                  style={!dark ? { color: '#242024' } : { color: '#FFF' }}
                  size="2xl"
                />
              </div>
              <h3>Only Classes</h3>
              <ul className={styles.ul}>
                <li>
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={
                      !dark
                        ? { color: '#242024', paddingRight: '10px' }
                        : { color: '#FFF', paddingRight: '10px' }
                    }
                    fade
                    size="2xs"
                  />
                  Access to classes with prior registration
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={
                      !dark
                        ? { color: '#242024', paddingRight: '10px' }
                        : { color: '#FFF', paddingRight: '10px' }
                    }
                    fade
                    size="2xs"
                  />
                  Schedule visualization
                </li>
              </ul>
              <div className={styles.price}>{membershipButton('only_classes')}</div>
            </div>
            <div
              className={
                user?.isActive && user.membership === 'classic'
                  ? `${styles.membershipCard} ${styles.actualPlan}`
                  : styles.membershipCard
              }
            >
              <div className={styles.tier}>
                <FontAwesomeIcon
                  icon={faCloud}
                  style={{ color: '#6d15e8', alignSelf: 'center' }}
                  size="lg"
                />
                <FontAwesomeIcon
                  icon={faUserAstronaut}
                  style={!dark ? { color: '#242024' } : { color: '#FFF' }}
                  size="2xl"
                />
                <FontAwesomeIcon icon={faStar} style={{ visibility: 'hidden' }} size="lg" />
              </div>
              <h3>Classic</h3>
              <ul className={styles.ul}>
                <li>
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={
                      !dark
                        ? { color: '#242024', paddingRight: '10px' }
                        : { color: '#FFF', paddingRight: '10px' }
                    }
                    fade
                    size="2xs"
                  />
                  Access to the gym area
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={
                      !dark
                        ? { color: '#242024', paddingRight: '10px' }
                        : { color: '#FFF', paddingRight: '10px' }
                    }
                    fade
                    size="2xs"
                  />
                  Personalized training guidance by a coach
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={
                      !dark
                        ? { color: '#242024', paddingRight: '10px' }
                        : { color: '#FFF', paddingRight: '10px' }
                    }
                    fade
                    size="2xs"
                  />
                  Schedule visualization
                </li>
              </ul>
              <div className={styles.price}>{membershipButton('classic')}</div>
            </div>
            <div
              className={
                user?.isActive && user.membership === 'black'
                  ? `${styles.membershipCard} ${styles.actualPlan}`
                  : styles.membershipCard
              }
            >
              <div className={styles.tier}>
                <FontAwesomeIcon icon={faCloud} style={{ color: '#6d15e8' }} size="lg" />
                <FontAwesomeIcon
                  icon={faUserAstronaut}
                  style={!dark ? { color: '#242024' } : { color: '#FFF' }}
                  size="2xl"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ color: '#e8b315', alignSelf: 'flex-end' }}
                  size="lg"
                />
              </div>
              <h3>Black</h3>
              <ul className={styles.ul}>
                <li>
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={
                      !dark
                        ? { color: '#242024', paddingRight: '10px' }
                        : { color: '#FFF', paddingRight: '10px' }
                    }
                    fade
                    size="2xs"
                  />
                  Access to the gym area
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={
                      !dark
                        ? { color: '#242024', paddingRight: '10px' }
                        : { color: '#FFF', paddingRight: '10px' }
                    }
                    fade
                    size="2xs"
                  />
                  Access to classes with prior registration
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={
                      !dark
                        ? { color: '#242024', paddingRight: '10px' }
                        : { color: '#FFF', paddingRight: '10px' }
                    }
                    fade
                    size="2xs"
                  />
                  Personalized training guidance by a coach
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={
                      !dark
                        ? { color: '#242024', paddingRight: '10px' }
                        : { color: '#FFF', paddingRight: '10px' }
                    }
                    fade
                    size="2xs"
                  />
                  Schedule visualization
                </li>
              </ul>
              <div className={styles.price}>{membershipButton('black')}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Landing;
