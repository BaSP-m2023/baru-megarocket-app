import React from 'react';
import styles from './button.module.css';

function Button({ action, text, img, classNameButton }) {
  return (
    <div onClick={action ? action : undefined}>
      {img ? (
        <img className={styles.icon} src={img} alt={text} />
      ) : (
        <button className={`${styles.button} ${styles[classNameButton]}`}>{text}</button>
      )}
    </div>
  );
}

export default Button;
