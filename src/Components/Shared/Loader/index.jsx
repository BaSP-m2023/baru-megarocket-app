import { useSelector } from 'react-redux';
import styles from './loader.module.css';
import React from 'react';

export default function Loader() {
  const { dark } = useSelector((state) => state.darkmode);
  return <span className={!dark ? styles.loader : styles.darkLoader}></span>;
}
