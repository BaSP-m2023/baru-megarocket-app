import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './button.module.css';

export function Button({ action, text, img, classNameButton, disabled, testid, icon }) {
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

export function Reset({ action }) {
  return (
    <div className={styles.resetContainer} onClick={() => action()}>
      <FontAwesomeIcon icon={faRotateLeft} className={styles.reset} />
      reset
    </div>
  );
}
