import { useState } from 'react';
import styles from './buttonSilder.module.css';

const ButtonSlider = ({ status }) => {
  const [check, setCheck] = useState(status);
  return (
    <label className={styles.switch}>
      <input type="checkbox" defaultChecked={check} onClick={() => setCheck(!check)} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default ButtonSlider;
