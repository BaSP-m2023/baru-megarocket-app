import React from 'react';
import styles from './layout.module.css';

import Header from './Header';
import Footer from './Footer';

const Layout = (props) => {
  return (
    <div className={styles.container}>
      <Header routes={props.routes} />
      <div className={styles.center}>{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
