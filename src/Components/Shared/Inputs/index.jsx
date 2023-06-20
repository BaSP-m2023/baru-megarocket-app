import React from 'react';
import styles from './input.module.css';

<<<<<<< HEAD
export function Input({ labelText, type, name, placeholder, blur, register, error }) {
=======
export function Input({ labelText, type, name, placeholder, blur, register, disabled, error }) {
>>>>>>> master
  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {labelText}
      </label>
      <input
        className={type !== 'checkbox' ? styles.input : ''}
        type={type || 'text'}
        name={name}
        placeholder={placeholder || ''}
        onBlur={blur && blur}
<<<<<<< HEAD
=======
        disabled={disabled}
>>>>>>> master
        {...(register && { ...register(name) })}
      />
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
}

export function Textarea({ labelText, rows, cols, name, placeholder, blur, register, error }) {
  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {labelText}
      </label>
      <textarea
        className={styles.textarea}
        name={name}
        rows={rows}
        cols={cols}
        placeholder={placeholder || ''}
        onBlur={blur && blur}
        {...(register && { ...register(name) })}
      ></textarea>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
}
