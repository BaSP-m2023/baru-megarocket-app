import React from 'react';
import styles from './button.module.css';

function Button({ action, text, img, classNameButton, disabled, testid, icon }) {
  return (
    <div>
      {img ? (
        <img
          className={styles.icon}
          src={img}
          alt={text}
          onClick={action ? action : undefined}
          data-testid={testid}
        />
      ) : (
        <button
          className={`${styles.button} ${styles[classNameButton]} ${
            disabled ? styles.cancelButton : ''
          }`}
          onClick={action ? action : undefined}
          disabled={disabled}
        >
          {text}
          {icon}
        </button>
      )}
    </div>
  );
}

export default Button;
