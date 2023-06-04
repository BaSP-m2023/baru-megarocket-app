import React from 'react';
import styles from './textarea.module.css';

function Textarea({ labelText, value, name, change, placeholder, blur }) {
  return (
    <>
      <label className={styles.label}>{labelText}</label>
      <input
        className={styles.textarea}
        name={name}
        placeholder={placeholder || ''}
        value={value}
        onBlur={blur && blur}
        onChange={change && change}
      />
    </>
  );
}

export default Textarea;
