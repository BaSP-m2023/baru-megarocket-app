import React from 'react';
import styles from './layout.module.css';
import { useSelector } from 'react-redux';

import Header from './Header';
import Footer from './Footer';

const Layout = (props) => {
  const { dark } = useSelector((state) => state.darkmode);
  return (
    <div className={!dark ? styles.container : styles.darkContainer}>
      <Header routes={props.routes} />
      <div className={styles.center}>{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
