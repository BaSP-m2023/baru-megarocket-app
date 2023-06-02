import React from 'react';
import Styles from './button.module.css';

function Button({ onCloseButton, text, img, classNameButton }) {
  return (
    <div onClick={onCloseButton ? onCloseButton : undefined}>
      {img ? (
        <img className={Styles.icon} src={img} alt={text} />
      ) : (
        <button className={`${Styles[classNameButton]}`}>{text}</button>
      )}
    </div>
  );
}

export default Button;
