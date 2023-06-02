import React from 'react';
import Styles from './button.module.css';

function Button({ onCloseButton, text, img, classNameButton }) {
  return (
    <div onClick={onCloseButton ? onCloseButton : undefined}>
      {img ? (
        <img className={Styles.icon} src={img} />
      ) : (
        <button
          className={
            classNameButton === 'deleteButton'
              ? `${Styles.deleteButton}`
              : classNameButton === 'addButton'
              ? `${Styles.addButton}`
              : classNameButton === 'submitButton'
              ? `${Styles.submitButton}`
              : Styles.cancelButton
          }
        >
          {text}
        </button>
      )}
    </div>
  );
}

export default Button;
