import React from 'react';
import styles from './button.module.css';

function Button({ action, text, img, classNameButton, disabled }) {
  return (
    <div>
      {img ? (
        <img className={styles.icon} src={img} alt={text} onClick={action ? action : undefined} />
      ) : (
        <button
          className={`${styles.button} ${styles[classNameButton]}`}
          onClick={action ? action : undefined}
          disabled={disabled}
        >
          {text}
        </button>
      )}
    </div>
  );
}

export default Button;
