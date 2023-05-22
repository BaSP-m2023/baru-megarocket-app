import Activities from '../Activities';
import Admins from '../Admins/index';
import Classes from '../Classes';
import Members from '../Members';
import Subscriptions from '../Subscriptions';
import SuperAdmins from '../SuperAdmins';
import Trainers from '../Trainers';

import Home from '../Home/index';
import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './layout.module.css';

function Layout() {
  let currentScreen = <Home />;
  switch (window.location.pathname) {
    case '/activities':
      currentScreen = <Activities />;
      break;
    case '/admins':
      currentScreen = <Admins />;
      break;
    case '/classes':
      currentScreen = <Classes />;
      break;
    case '/members':
      currentScreen = <Members />;
      break;
    case '/subscriptions':
      currentScreen = <Subscriptions />;
      break;
    case '/super-admins':
      currentScreen = <SuperAdmins />;
      break;
    case '/trainers':
      currentScreen = <Trainers />;
      break;
    default:
      break;
  }

  return (
    <div className={styles.container}>
      <Header />
      {currentScreen}
      <Footer />
    </div>
  );
}

export default Layout;
