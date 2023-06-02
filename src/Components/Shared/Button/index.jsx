import React from 'react';
import Styles from './button.module.css';

function Button({ action, text, img, classNameButton }) {
  return (
    <div onClick={action ? action : undefined}>
      {img ? (
        <img className={Styles.icon} src={img} alt={text} />
      ) : (
        <button className={`${Styles[classNameButton]} ${Styles.button}`}>{text}</button>
      )}
    </div>
  );
}

export default Button;
